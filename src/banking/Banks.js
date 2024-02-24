import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useEffect } from 'react';
import AmmperService from '../api/ammper/Service';
import { useState } from 'react';
import { Navigate } from 'react-router-dom';


function retrieveAccounts(event, bank) {
  event.preventDefault();
  console.log(bank.name);
}

export default function Banks({userState}) {
  const [userAuth, setUserAuth] = userState;
  const [bankData, setBankData] = useState([]);
  useEffect(() => {
    AmmperService.listBanks().then((res) => setBankData(res.data));
  }, []);

  if (!userAuth)
    return <Navigate to="/signin" />

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bank ID</TableCell>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {bankData.map((bank) => (
            <TableRow key={bank.bank_id}>
              <TableCell>
              <Link color="primary" href="#" onClick={(e) => retrieveAccounts(e, bank)} sx={{ mt: 3 }}>
                {bank.bank_id}
              </Link>
              </TableCell>
              <TableCell>{bank.display_name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
