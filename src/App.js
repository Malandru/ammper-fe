import logo from './logo.svg';
import './App.css';
import AmmperService from './api/ammper/Service';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import SignIn from './home/SignIn';
import SignUp from './home/SignUp';
import Orders from './banking/Banks';


function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

const rows = [
  createData(
    0,
    '16 Mar, 2019',
    'Elvis Presley',
    'Tupelo, MS',
    'VISA ⠀•••• 3719',
    312.44,
  ),
  createData(
    1,
    '16 Mar, 2019',
    'Paul McCartney',
    'London, UK',
    'VISA ⠀•••• 2574',
    866.99,
  ),
  createData(2, '16 Mar, 2019', 'Tom Scholz', 'Boston, MA', 'MC ⠀•••• 1253', 100.81),
  createData(
    3,
    '16 Mar, 2019',
    'Michael Jackson',
    'Gary, IN',
    'AMEX ⠀•••• 2000',
    654.39,
  ),
  createData(
    4,
    '15 Mar, 2019',
    'Bruce Springsteen',
    'Long Branch, NJ',
    'VISA ⠀•••• 5919',
    212.79,
  ),
];

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
    return <Orders rows={rows} />;
  else
    return <Navigate to="/signin" />;
}

export default App;
