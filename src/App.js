import './App.css';
import AmmperService from './api/ammper/Service';
import { useEffect, useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './home/SignIn';
import SignUp from './home/SignUp';
import Banks from './banking/Banks';


function App() {
  const [userAuth, setUserAuth] = useState();

  function handleLogout() {
    AmmperService.logout().then(() => setUserAuth(false));
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
          <Route path='/' element={<HomePage userState={[userAuth, setUserAuth]} />} />
          <Route path='/signin' element={<SignIn userState={[userAuth, setUserAuth]}/>} />
          <Route path='/signup' element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </Box>
  );
}

function HomePage({userState}) {
  const [userAuth, setUserAuth] = userState;

  if (userAuth)
    return <Banks userState={[userAuth, setUserAuth]} />;
  else
    return <Navigate to="/signin" />;
}

export default App;
