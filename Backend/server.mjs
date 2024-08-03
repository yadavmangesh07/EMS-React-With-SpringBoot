import express from 'express';
import bodyParser from 'body-parser';
import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const mongoUrl = process.env.MONGO_DB_URL;

if (!mongoUrl) {
  console.error('MongoDB URL is not defined in the .env file');
  process.exit(1);
}

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => {
    console.error('Error connecting to MongoDB:', err);
    process.exit(1);
  });

const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

const User = mongoose.model('User', UserSchema);

const app = express();
app.use(bodyParser.json());
app.use(cors());

// User registration endpoint
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword });
    await user.save();
    res.status(201).json({ userId: user._id });
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ error: 'Email already registered' });
    } else {
      console.error('Error registering user:', error);
      res.status(500).json({ error: 'Error registering user' });
    }
  }
});

// User login endpoint
app.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        res.status(200).json({ message: 'Login successful' });
      } else {
        res.status(401).json({ error: 'Invalid credentials' });
      }
    } else {
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
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const result = await User.updateOne({ email }, { password: hashedPassword });
    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Password reset successful' });
    } else {
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
