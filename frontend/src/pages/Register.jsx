import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Snackbar from '@mui/material/Snackbar';
import { AuthContext } from '../contexts/AuthContext';


const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  maxHeight:'90vh',
  overflowY: 'auto',
  [theme.breakpoints.up('sm')]: {
    maxWidth: '450px',
  },
  boxShadow:
    '#3b0404 0px 5px 15px 0px, #3b0404 0px 15px 35px -5px',
  ...theme.applyStyles('dark', {
    boxShadow:
      '#3b0404 0px 5px 15px 0px, #3b0404 0px 15px 35px -5px',
  }),
}));

const SignInContainer = styled(Stack)(({ theme }) => ({
  height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
  minHeight: '100%',
  position: 'relative',
  overflow: 'auto',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
  '&::before': {
    content: '""',
    display: 'block',
    position: 'absolute',
    zIndex: -1,
    inset: 0,
    backgroundImage:
      'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
    backgroundRepeat: 'no-repeat',
    ...theme.applyStyles('dark', {
      backgroundImage:
        'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
    }),
  },
}));

export default function Register() {
  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('')
  const [formState, setFormState] = React.useState(0);
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [confirmPasswordError, setConfirmPasswordError] = React.useState(false);
  const [confirmPasswordErrorMessage, setConfirmPasswordErrorMessage] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState('');

  const {handleRegister, handleLogin} = React.useContext(AuthContext);

  let handleRegisterSubmit = async() => {
    try {
      if (formState === 0) {
      let result = await handleRegister(name,username,email, password,confirmPassword);
      setOpen(true);
      setName('');
      setUsername('');
      setEmail('');
      setPassword('');
      setConfirmPassword('');
      setFormState(1);
      setEmailError("");
      setEmailErrorMessage("");
      setPasswordError("");
      setPasswordErrorMessage("");
      setConfirmPasswordError("");
      setConfirmPasswordErrorMessage("");
      setMessage("Registration successful! ");
    }
    if (formState === 1) {
      let result = await handleLogin(email, password);
      }
  } catch (error) {
    let message = (error.response && error.response.data && error.response.data.message) || 'An error occurred. Please try again.';
    setMessage(message);
  
  }

  } 

  const validateInputs = () => {
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const confirmPassword = document.getElementById('confirm-password') ? document.getElementById('confirm-password').value : '';
    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage('Please enter a valid email address.');
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage('');
    }

    if (!password.value || password.value.length < 8) {
      setPasswordError(true);
      setPasswordErrorMessage('Password must be at least 8 characters long.');
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage('');
    }
    if (formState === 0) {
      if (!confirmPassword || confirmPassword !== password.value) {
        setConfirmPasswordError(true);
        setConfirmPasswordErrorMessage('Passwords do not match.');
        isValid = false;
      } else {
        setConfirmPasswordError(false);
        setConfirmPasswordErrorMessage('');
      }
    }

    return isValid;
  };

  return (
    <main>
      <CssBaseline enableColorScheme />
      <SignInContainer  display='flex' direction="column" justifyContent="space-between">
        <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column' }} >
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: '100%', color: '#3b0404', fontSize: 'clamp(2rem, 10vw, 2.15rem)', fontWeight: '600', textAlign: 'center' }}
          >
            {formState === 0?<b>Register</b>:<b>Login</b>}
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              gap: 2,
              justifyContent: 'center',
              backgroundColor: formState === 1 ? '#f5f5f5' : 'transparent',
            }}
          >
            <FormControl>
              {formState === 0 ?<>
              <FormLabel >Name </FormLabel>
              
              <TextField
                id="name"
                type="text"
                name="name"
                value={name}
                placeholder="John Doe"
                required
                fullWidth
                variant="outlined"
                autoFocus
                onChange={(e)=> setName(e.target.value)}
              /> </> : <> </> }
            </FormControl>
            <FormControl>
              {formState === 0 ?<>
              <FormLabel >user name </FormLabel>
              <TextField
                id="username"
                type="name"
                name="username"
                value={username}
                placeholder="John_Doe123"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e)=> setUsername(e.target.value)}


              /> </> : <> </> }
            </FormControl>
            <FormControl>
              <FormLabel >Email </FormLabel>
              <TextField
                error={emailError}
                helperText={emailErrorMessage}
                id="email"
                type="email"
                name="email"
                value={email}
                placeholder="your@email.com"
                autoComplete="email"
                autoFocus
                required
                fullWidth
                variant="outlined"
                color={emailError ? 'error' : 'primary'}
                onChange={(e)=> setEmail(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel >Password</FormLabel>
              <TextField
                error={passwordError}
                helperText={passwordErrorMessage}
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                color={passwordError ? 'error' : 'primary'}
                onChange={(e)=> setPassword(e.target.value)}
              />
            </FormControl>
              <FormControl>
              <FormLabel >Confirm Password</FormLabel>
              {formState === 0 ?
              <TextField
              error={confirmPasswordError}
              helperText={confirmPasswordErrorMessage}
                name="confirm-password"
                placeholder="••••••"
                type="password"
                id="confirm-password"
                value={confirmPassword}
                required
                fullWidth
                variant="outlined"
                color={confirmPasswordError ? 'error' : 'primary'}
                onChange={(e)=> setConfirmPassword(e.target.value)}
              /> : <> </>}
            </FormControl>
            
            <Button
              type="button"
              onClick={handleRegisterSubmit}
              fullWidth
              variant="contained"
              sx={{ backgroundColor: '#3b0404' }}
              
            >
              {formState === 0 ? 'Sign Up' : 'Login'}
            </Button>
            
          </Box>
          <Divider>or</Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="body2" sx={{ textAlign: 'center' }}>
              <button
              onClick={() => setFormState(formState === 0 ? 1 : 0)}
                sx={{ backgroundColor: '#3b0404', color: 'white', textTransform: 'none', alignSelf: 'center' }}
              >
                {formState === 0 ? 'already have an account? login' : "don't have an account? sign up"}
              </button>
            </Typography>
          </Box>
        </Card>
      </SignInContainer>

      <Snackbar 
        open={open}
        autoHideDuration={6000}
        message={message}
      />
    </main>
  );
}

