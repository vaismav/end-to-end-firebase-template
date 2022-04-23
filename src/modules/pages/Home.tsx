import { Button } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';
import { AccountData } from 'modules/types';
import { httpCall } from 'cloud-utilities';
import { GenericCard } from 'modules/common/GenericCard';

const Home = ({}): ReactElement => {
  const [accountsData, setAccountsData] = useState<any[]>();
  const navigate = useNavigate();

  useEffect(() => {
    httpCall('AccountsInfo')
      .then((res: any) => {
        if (res.data) {
          setAccountsData(res.data);
        }
      })
      .catch((e) => console.log('Error: Home: AccountsInfo', e));
  }, []);

  return (
    <Stack spacing={2}>
      <h2> Accounts Info </h2>
      {accountsData &&
        accountsData?.map((account) => (
          <GenericCard
            key={account.accountID}
            title={'Account ' + account.accountID}
            data={[
              {
                title: 'Branch',
                content: account.branchID,
              },
              {
                title: 'Balance',
                content: account.balance,
              },
            ]}
          />
        ))}
    </Stack>
  );
};

export { Home };
