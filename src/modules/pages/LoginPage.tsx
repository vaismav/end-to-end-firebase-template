import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useInput } from 'modules/hooks/useInput';
import { Button, FormControl } from '@material-ui/core';
import { Stack } from '@mui/material';
import { emailValidation } from 'modules/validators';
import { signInWithEmail } from 'cloud-utilities';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({}): ReactElement => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordField = useInput('password', 'Password', {
    shouldHide: true,
  });
  const emailField = useInput('email', 'Email', {
    validateOnChange: emailValidation,
  });
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (passwordField.value === '' || emailField.value === '' || !emailField.isValid) {
      alert(
        (emailField.value === ''
          ? 'Email must be provided.\n'
          : !emailField.isValid
          ? 'Must enter valid email.\n'
          : '') + (passwordField.value === '' ? 'Password must be provided.' : ''),
      );
    } else {
      handleSignIn();
    }
  };

  const handleSignIn = () => {
    setIsLoading(true);
    signInWithEmail(emailField.value, passwordField.value)
      .then((response) => {
        const uid = response.user.uid;
        alert('Welcome!');
        navigate('/dashboard');
      })
      .catch((err) => {
        console.log(err);
        alert('something went wrong');
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      <FormControl variant="outlined">
        <Stack spacing={2}>
          {emailField.element}
          {passwordField.element}
        </Stack>
      </FormControl>
      <Button variant="contained" onClick={handleSubmit}>
        yalla
      </Button>
    </>
  );
};

export { LoginPage };
