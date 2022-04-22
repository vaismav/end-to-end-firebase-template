import React, { FC, ReactElement, useEffect, useState } from 'react';
import { useInput } from 'modules/hooks/useInput';
import { Button, FormControl, Grid } from '@material-ui/core';
import { useSelect } from 'modules/hooks/useSelect';
import { getValue } from '@testing-library/user-event/dist/utils';
import { httpCall } from 'cloud-utilities';
import { LooseObject } from 'modules/types';

const emailValidation = (value: string): boolean =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  );

const toUseSelectOptions = (array: string[]) => array.map((v: string) => ({ value: v, label: v }));
const maritalStatusOptions = toUseSelectOptions(['single', 'married', 'divorced']);
const employmentStatusOptions = toUseSelectOptions(['employed', 'unemployed', 'retired']);

const CreateAccount = ({}): ReactElement => {
  const firstName = useInput('firstName', 'First Name', { defaultValue: 'avishai' });
  const lastName = useInput('lastName', 'Last Name', { defaultValue: 'vaisman' });
  const identityNumber = useInput('identityNumber', 'Identity Number', { defaultValue: '203550611' });
  const maritalStatus = useSelect('maritalStatus', 'Marital Status', maritalStatusOptions, { defaultValue: 'single' });
  const employmentStatus = useSelect('employmentStatus', 'Employment Status', employmentStatusOptions, {
    defaultValue: 'employed',
  });
  const homeAddress = useInput('homeAddress', 'Home Address', { defaultValue: 'shenkin 39' });
  const email = useInput(
    'email',
    'Email',
    {
      validateOnChange: emailValidation,
      defaultValue: 'avishai@vaisman.com',
    },
    {
      required: true,
    },
  );
  const phoneNumber = useInput('phoneNumber', 'Phone Number', { defaultValue: '0532330515' });
  const password = useInput('password', 'Password', { defaultValue: 'ABCdef123!@#' });

  const inputFields = [
    firstName,
    lastName,
    identityNumber,
    maritalStatus,
    employmentStatus,
    homeAddress,
    email,
    phoneNumber,
    password,
  ];

  const sendRequest = () => {
    let data: LooseObject = {};
    inputFields.forEach((field) => {
      data[field.id] = field.value;
    });
    httpCall('CreateAccount', data);
  };

  return (
    <>
      <FormControl variant="outlined">
        <Grid container spacing={2}>
          {inputFields.map((field, index) => (
            <Grid item key={index}>
              {field.element}
            </Grid>
          ))}
        </Grid>
      </FormControl>
      <Button variant="contained" onClick={sendRequest}>
        yalla
      </Button>
      {inputFields.map((f) => '| ' + f.value + ' ')}
    </>
  );
};

export { CreateAccount };
