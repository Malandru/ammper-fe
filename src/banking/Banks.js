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
import ErrorAPI from '../api/ErrorAPI';



export default function Banks() {
  // const [userAuth, setUserAuth] = useState(AmmperService.sessionExists());
  const [bankData, setBankData] = useState([]);
  const [fetchData, setFetchData] = useState({fetched: false, error: false});

  useEffect(() => {
    AmmperService.listBanks()
    .then((res) => setBankData(res.data))
    .catch((res) => setFetchData({error: res}));
  }, []);

  function retrieveAccounts(event, bank) {
    event.preventDefault();
    if(accountsFetchable(bank))
      AmmperService.listAccounts(bank)
      .then((res) => setFetchData({fetched: true, bank, accounts: res.data}))
      .catch((res) => setFetchData({error: res}));
  }

  function accountsFetchable(bank) {
    return bank.resources.some(str => str === 'ACCOUNTS')
  }

  // if (!userAuth)
  //   return <Navigate to="/signin" />
  
  if (fetchData.error)
    return <ErrorAPI response={fetchData.error} />
  
  if (fetchData.fetched)
    return <Navigate to="/accounts" state={{bank: fetchData.bank, accounts: fetchData.accounts }}/>

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Bank ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Accounts fetchable</TableCell>
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
              <TableCell>{accountsFetchable(bank) ? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </React.Fragment>
  );
}
