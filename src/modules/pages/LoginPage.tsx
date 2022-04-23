import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useInput } from 'modules/hooks/useInput';
import { Button, FormControl, Grid } from '@material-ui/core';
import { useSelect } from 'modules/hooks/useSelect';

const LoginPage = ({}): ReactElement => {
  return (
    <>
      <FormControl variant="outlined">
        <Grid container spacing={2}></Grid>
      </FormControl>
      <Button variant="contained">yalla</Button>
    </>
  );
};

export { LoginPage };
