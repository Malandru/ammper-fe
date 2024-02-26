import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs from 'dayjs';

export default function TransactionDialog({data, handleClose, handleSubmit}) {
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const open = data.open;
  const account = open ? data.account : {};

  function disableFetchButton() {
    return fromDate == null || toDate == null;
  }

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            const data = new FormData(event.currentTarget);
            const request = {
              link: account.link_id,
              date_from: data.get('from_date'),
              date_to: data.get('to_date'),
              account: account.account_id,
            }
            handleSubmit(request);
            setFromDate(null);
            setToDate(null);
          },
        }}
      >
        <DialogTitle>Fetch Transactions</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please provide the following fields. 
          </DialogContentText>
          <TextField
            id="account-name"
            margin="dense"
            fullWidth
            label="Account"
            defaultValue={account.account_name}
            InputProps={{readOnly: true}}
            variant="standard"
            disabled
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker name='from_date' format='YYYY-MM-DD' value={fromDate} onChange={(date) => setFromDate(date)} label='From date' maxDate={dayjs()}/>
            <DatePicker name='to_date' format='YYYY-MM-DD' value={toDate} onChange={(date) => setToDate(date)} label='To date' maxDate={dayjs()} minDate={fromDate}/>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit" disabled={disableFetchButton()}>Fetch</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
