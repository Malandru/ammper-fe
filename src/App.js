import './App.css';
import AmmperService from './api/ammper/Service';
import { useState } from 'react';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './home/SignIn';
import SignUp from './home/SignUp';
import Banks from './banking/Banks';
import Accounts from './banking/Accounts';
import NotFound from './NotFound';


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
          <Route path='/accounts' element={<Accounts />} />
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


export default App;
