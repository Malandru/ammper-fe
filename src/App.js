import './App.css';
import AmmperService from './api/ammper/Service';
import { useState } from 'react';
import { Alert, AppBar, Box, Button, Container, CssBaseline, Grid, Link, ThemeProvider, Toolbar, Typography, createTheme } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './home/SignIn';
import SignUp from './home/SignUp';
import Banks from './banking/Banks';

const defaultTheme = createTheme();


function App() {
  const [userAuth, setUserAuth] = useState(AmmperService.sessionExists());

  function handleLogout() {
    AmmperService.logout().then(() => AmmperService.updateSession(false, setUserAuth)).catch(() => AmmperService.updateSession(false, setUserAuth));
  }

  return (
    <Box sx={{flexGrow: 1}}>
      <AppBar position="static">
        <Toolbar variant="dense">
          <Typography variant="h6" color="inherit" component="div" sx={{ flexGrow: 1 }}>
            Ammper
          </Typography>
          {userAuth && <Button color="inherit" onClick={handleLogout}>Logout</Button> }
        </Toolbar>
      </AppBar>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='*' exact={true} element={<NotFound allowed={userAuth}/>}/>
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

function HomePage() {
  const userAuth = AmmperService.sessionExists();

  if (userAuth)
    return <Banks />;
  else
    return <Navigate to="/signin" />;
}


function NotFound({allowed}) {
  console.log(allowed);
  return (
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
          {
            allowed ? ( <div>
              <Alert severity="warning">Page not found.</Alert>
              <Link href="/" variant="body2">
                Go to home page
              </Link>
            </div>
            ): ( <div>
              <Alert severity="error">Not allowed to access this page</Alert>
              <Link href="/signin" variant="body2">
                Please sign in
              </Link></div>
            )
          }
      </Box>
    </Container>
  </ThemeProvider>);
}

export default App;
