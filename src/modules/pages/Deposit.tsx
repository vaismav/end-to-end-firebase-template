import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { httpCall } from 'cloud-utilities';
import { useInput } from 'modules/hooks/useInput';
import { areInputsValid, positiveNumber } from 'utilities/validators';
import { Button } from '@material-ui/core';

const Deposit = ({}): ReactElement => {
  const amountField = useInput(
    'amount',
    'Amount',
    {
      validateOnChange: positiveNumber,
    },
    {
      inputProps: {
        type: 'number',
      },
    },
  );
  const dstAccountField = useInput(
    'dstAccount',
    'Recipient account',
    {
      validateOnChange: positiveNumber,
    },
    {
      inputProps: {
        type: 'number',
      },
    },
  );
  const dstAccountBranchField = useInput(
    'dstBranch',
    "Recipient account' branch",
    {
      validateOnChange: positiveNumber,
    },
    {
      inputProps: {
        type: 'number',
      },
    },
  );
  const navigate = useNavigate();

  const dstFields = [amountField, dstAccountField, dstAccountBranchField];

  const handleSubmit = () => {
    if (areInputsValid(dstFields)) {
      httpCall('Deposit', {
        amount: amountField.value,
        dstAccount: dstAccountField.value,
        dstBranch: dstAccountBranchField.value,
      })
        .then(() => {
          alert('deposit request sent successfully');
          navigate('/deposit');
        })
        .catch((e) => {
          console.log('error from Deposit http call', e);
          alert(`
        oops, it looks like something went wrong\n
        please try again later`);
        });
    }
  };

  return (
    <Stack spacing={2}>
      <h2> Deposit Simulator </h2>
      {dstFields.map((field) => (
        <div key={field.id}>{field.element}</div>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        yalla
      </Button>
    </Stack>
  );
};

export { Deposit };
