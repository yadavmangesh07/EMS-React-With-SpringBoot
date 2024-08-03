import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom'
import Header from './Header';
import bg from '../assets/6.jpg'


function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Developed by '}
      <a className='underline text-red-500'  href="https://www.linkedin.com/in/mangesh-yadav-65a437237">
       Mangesh Yadav
      </a>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignIn({Login, setLogin}) {
  const [createAccount, setCreateAccount] = useState(false);
  const [error, setError] = useState('');
  
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email');
    const password = data.get('password');
    
    
    try {
      if (createAccount) {
        // Create account
        const response = await axios.post('https://ems-react-with-springboot.onrender.com/register', { email, password });
        console.log('User registered:', response.data);
      } else {
        // Login
        const response = await axios.post('https://ems-react-with-springboot.onrender.com/login', { email, password });
        console.log('User logged in:', response.data);
        setLogin(true);
       
        if(Login){
          navigate('/dashboard')
        }
     
        
          
      }
    } catch (error) {
      setError('Error: ' + (error.response ? error.response.data.error : error.message));
      console.error('There was an error!', error);
    }
  };

  const handleCreateAccountClick = () => {
    setCreateAccount(!createAccount);
  };

  return (
    <div 
    style={{
      padding: '0',
      margin: '0',
      backgroundImage: `url(${bg})`,
      backgroundSize:"cover",
      backgroundPosition:"center",
      backgroundRepeat:"no-repeat",
      height:"100vh"
      
      
    }}
    
    >
    <Header />
    <div className='mt-[6rem]  ' >
      <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {createAccount ? 'Sign Up' : 'Sign In'}
          </Typography>
          {error && <Typography color="error">{error}</Typography>}
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label={createAccount ? 'Email Address' : 'Email'}
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label={createAccount ? 'Create Password' : 'Password'}
              type="password"
              id="password"
              autoComplete="current-password"
            />
           
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {createAccount ? 'Sign Up' : 'Sign In'}
            </Button>
            <Grid container>
                {!createAccount &&
              <Grid item xs>
                <Link href="/forgotPassword" variant="body2" >
                  Forgot password?
                </Link>
              </Grid>}
              <Grid item>
                <Link href="#" variant="body2" onClick={handleCreateAccountClick}>
                  {createAccount ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
    </div>
    </div>  );
}
