import { Button } from '@material-ui/core';
import React, { ReactElement } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack } from '@mui/material';

const PageNotFound = ({}): ReactElement => {
  const navigate = useNavigate();

  return (
    <Stack>
      oh no 404
      <Button onClick={() => navigate('/')} variant="contained">
        Back Home
      </Button>
    </Stack>
  );
};

export { PageNotFound };
