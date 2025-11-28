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
const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [name, setName] = React.useState('');
    const [error, setError] = React.useState('');
    const [message, setMessage] = React.useState('');

    const [formState, setFormState] = React.useState(0);

    const [open, setOpen] = React.useState(false)

  const {handleRegister, handleLogin} = React.useContext(AuthContext);

  let handleRegisterSubmit = async() => {
    let result = null;
    let result1 = null;
     try {
            if (formState === 1) {

                 result1 = await handleLogin(username, password)


            }
            if (formState === 0) {
                result = await handleRegister(name, username, password);
                console.log(result);
                setName("");
                setUsername("");
                setMessage(result);
                setOpen(true);
                setError("")
                setFormState(1)
                setPassword("")
            }
            console.log(result);
        } catch (err) {

            console.log(err);
            let message = err?.response?.message ||
    err?.message ||
    "Unknown error occurred";
  setError(message);
        }
    }

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
                autoComplete='on'
                fullWidth
                variant="outlined"
                autoFocus
                onChange={(e)=> setName(e.target.value)}
              /> </> : <> </> }
            </FormControl>
            <FormControl>
              
              <FormLabel >user name </FormLabel>
              <TextField
                id="username"
                type="name"
                autoComplete='on'
                name="username"
                value={username}
                placeholder="John_Doe123"
                autoFocus
                required
                fullWidth
                variant="outlined"
                onChange={(e)=> setUsername(e.target.value)}


              />           </FormControl>
            
            <FormControl>
              <FormLabel >Password</FormLabel>
              <TextField
                
                name="password"
                placeholder="••••••"
                type="password"
                id="password"
                value={password}
                autoComplete="current-password"
                required
                fullWidth
                variant="outlined"
                onChange={(e)=> setPassword(e.target.value)}
              />
            </FormControl>

            <p style={{ color: "red" }}>{error}</p>
                         
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
        autoHideDuration={4000}
        message={message || ''}
        
      />
    </main>
  );
}

