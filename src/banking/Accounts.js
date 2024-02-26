import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NotFound from '../NotFound';
import AmmperService from '../api/ammper/Service';
import { Navigate, useLocation } from 'react-router-dom';
import { Link } from '@mui/material';
import { useState } from 'react';
import TransactionDialog from './TransactionDialog';
import ErrorAPI from '../api/ErrorAPI';



export default function Accounts() {
  const [dialogData, setDialogData] = useState({open: false});
  const [error, setError] = useState();
  const [accountData, setAccountData] = useState();
  const {state} = useLocation();

  function transactionsFetchable(bank) {
    return bank.resources.some(str => str === 'TRANSACTIONS')
  }

  function handleTransactionLink(event, account) {
    event.preventDefault();
    setDialogData({open: true, account})
  }

  function handleCloseDialog () {
    setDialogData({open: false})
  }

  function handleSumbitDialog (request) {
    console.log(request);
    AmmperService.listTransactions(request)
    .then((res) => setAccountData(res.data))
    .catch((res) => setError(res));
  }

  if (state == null) {
    const userAuth = AmmperService.sessionExists();
    return <NotFound allowed={userAuth}/>
  }

  if (error) {
    return <ErrorAPI response={error}/>
  }

  if (accountData) {
    return <Navigate to='/transactions' state={{accountData}}/>
  }

  let accounts = state.accounts;
  let bank = state.bank;

  return (
    <React.Fragment>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Account ID</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Number</TableCell>
            <TableCell>Bank</TableCell>
            <TableCell>Transactions fetchable</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accounts.map((account) => (
            <TableRow key={account.account_id}>
              <TableCell>
                <Link color="primary" href="#" onClick={(e) => handleTransactionLink(e, account)} sx={{ mt: 3 }}>
                  {account.account_id}
                </Link>
              </TableCell>
              <TableCell>{account.account_name}</TableCell>
              <TableCell>{account.account_number}</TableCell>
              <TableCell>{bank.display_name}</TableCell>
              <TableCell>{transactionsFetchable(bank) ? "YES" : "NO"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TransactionDialog data={dialogData} handleClose={handleCloseDialog} handleSubmit={handleSumbitDialog}/>
    </React.Fragment>
  );
}
