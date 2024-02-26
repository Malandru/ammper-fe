import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import NotFound from '../NotFound';
import AmmperService from '../api/ammper/Service';
import { useLocation } from 'react-router-dom';
import { Link, Typography } from '@mui/material';


export default function Transactions() {
  const {state} = useLocation();

  if (state == null) {
    const userAuth = AmmperService.sessionExists();
    return <NotFound allowed={userAuth}/>
  }

  const accountData = state.accountData;
  const transactions = accountData.transactions;

  function currencyFormat(num) {
    return '$' + num.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
 }

  return (
    <React.Fragment>
      <Typography component="p" variant="h5">
        Processed inflows: {currencyFormat(accountData.incomes)}
      </Typography>
      <Typography component="p" variant="h5">
        Processed outflows: {currencyFormat(accountData.expenses)}
      </Typography>
      <Typography component="p" variant="h5">
        Processed balance: {currencyFormat(accountData.balance)}
      </Typography>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Description</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Currency</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((trx) => (
            <TableRow key={trx.trx_id}>
              <TableCell>{trx.description}</TableCell>
              <TableCell>{trx.trx_type}</TableCell>
              <TableCell>{trx.amount}</TableCell>
              <TableCell>{trx.currency}</TableCell>
              <TableCell>{trx.status}</TableCell>
              <TableCell>{trx.value_date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link href="/" variant="body2">Go to home page</Link>
    </React.Fragment>
  );
}
