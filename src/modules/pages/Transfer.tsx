import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { httpCall } from 'cloud-utilities';
import { useSelect } from 'modules/hooks/useSelect';
import { useInput } from 'modules/hooks/useInput';
import { positiveNumber } from 'utilities/validators';
import { Button } from '@material-ui/core';

const Transfer = ({}): ReactElement => {
  const [accountsData, setAccountsData] = useState<any[]>();
  const [accountBalance, setAccountBalance] = useState();
  const selectAccount = useSelect('selectAccount', 'Select Account');
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
  const dstName = useInput('dstName', "Recipient's name");
  const navigate = useNavigate();

  const dstFields = [amountField, dstAccountField, dstAccountBranchField, dstName];

  useEffect(() => {
    httpCall('AccountsInfo')
      .then((res: any) => {
        if (res.data) {
          setAccountsData(res.data);
        }
      })
      .catch((e) => console.log('Error: Home: AccountsInfo', e));
  }, []);

  useEffect(() => {
    if (accountsData) {
      selectAccount.updateOptions(
        accountsData.map((account) => ({
          value: account.accountID,
          label: account.accountID,
        })),
      );
    }
  }, [accountsData]);

  useEffect(() => {
    if (selectAccount?.value && accountsData) {
      accountsData.forEach((account) => {
        if (account.accountID === selectAccount.value) {
          setAccountBalance(account.balance);
        }
      });
    }
  }, [selectAccount?.value]);

  const handleSubmit = () => {};

  return (
    <Stack spacing={2}>
      <h2> Make Transaction </h2>
      {selectAccount.element}
      {(accountBalance || accountBalance === 0) && `Account balance: ${accountBalance}`}
      {dstFields.map((field) => (
        <div key={field.id}>{field.element}</div>
      ))}
      <Button variant="contained" onClick={handleSubmit}>
        yalla
      </Button>
    </Stack>
  );
};

export { Transfer };
