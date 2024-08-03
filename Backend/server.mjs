import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import pkg from 'pg';
import cors from 'cors';

const { Pool } = pkg;

const app = express();
app.use(bodyParser.json());
app.use(cors());

// PostgreSQL pool setup
const pool = new Pool({
  user: 'postgres',
  host: '0.0.0.0',
  database: 'EMS',
  password: 'root',
  port: 5432,
});

// User registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
//   console.log(`Register request received for email: ${email}`); // Log the received request
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password) VALUES ($1, $2) RETURNING id',
      [email, hashedPassword]
    );
    // console.log(`User registered with ID: ${result.rows[0].id}`); // Log successful registration
    res.status(201).json({ userId: result.rows[0].id });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Error registering user' });
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  console.log(`Login request received for email: ${email}`); // Log the received request
  try {
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        console.log(`User logged in successfully: ${email}`); // Log successful login
        res.status(200).json({ message: 'Login successful' });
      } else {
        console.log(`Invalid password for email: ${email}`); // Log invalid password attempt
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
      console.log(`Email not found: ${email}`); // Log email not found
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error logging in user:', error);
    res.status(500).json({ error: 'Error logging in user' });
  }
});
// Reset password endpoint
app.post('/reset-password', async (req, res) => {
  const { email, newPassword } = req.body;
  console.log(`Reset password request received for email: ${email}`); // Log the received request
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await pool.query(
      'UPDATE users SET password = $1 WHERE email = $2',
      [hashedPassword, email]
    );
    if (result.rowCount > 0) {
      console.log(`Password reset successfully for email: ${email}`); // Log successful password reset
      res.status(200).json({ message: 'Password reset successful' });
    } else {
      console.log(`Email not found: ${email}`); // Log email not found
      res.status(404).json({ error: 'Email not found' });
    }
  } catch (error) {
    console.error('Error resetting password:', error);
    res.status(500).json({ error: 'Error resetting password' });
  }
});

app.listen(5001, () => {
  console.log('Server is running on port 5001');
});
