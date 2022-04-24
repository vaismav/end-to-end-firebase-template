import React, { ReactElement } from 'react';
import { useInput } from 'modules/hooks/useInput';
import { Button, Dialog, FormControl, Grid } from '@material-ui/core';
import { useSelect } from 'modules/hooks/useSelect';
import { httpCall } from 'cloud-utilities';
import { LooseObject } from 'modules/types';
import { useNavigate } from 'react-router-dom';
import { emailValidation } from 'utilities/validators';

const toUseSelectOptions = (array: string[]) => array.map((v: string) => ({ value: v, label: v }));
const maritalStatusOptions = toUseSelectOptions(['single', 'married', 'divorced']);
const employmentStatusOptions = toUseSelectOptions(['employed', 'unemployed', 'retired']);

const CreateAccount = ({}): ReactElement => {
  const firstName = useInput('firstName', 'First Name');
  const lastName = useInput('lastName', 'Last Name');
  const identityNumber = useInput('identityNumber', 'Identity Number');
  const maritalStatus = useSelect('maritalStatus', 'Marital Status', maritalStatusOptions);
  const employmentStatus = useSelect('employmentStatus', 'Employment Status', employmentStatusOptions);
  const homeAddress = useInput('homeAddress', 'Home Address');
  const email = useInput(
    'email',
    'Email',
    {
      validateOnChange: emailValidation,
    },
    {
      required: true,
    },
  );
  const phoneNumber = useInput('phoneNumber', 'Phone Number');
  const password = useInput('password', 'Password', {
    shouldHide: true,
  });
  const navigate = useNavigate();

  const inputFields = [
    firstName,
    lastName,
    identityNumber,
    email,
    phoneNumber,
    password,
    maritalStatus,
    employmentStatus,
    homeAddress,
  ];

  const sendRequest = () => {
    let data: LooseObject = {};
    let missingData: string[] = [];
    let invalidData: string[] = [];
    inputFields.forEach((field) => {
      switch (field.id) {
        case 'phoneNumber':
          data[field.id] = '+972' + field.value.substring(1);
          break;
        default:
          data[field.id] = field.value;
      }
      if (!field.isValid) {
        invalidData.push(field.id);
      } else if (field.value === '') {
        missingData.push(field.id);
      }
    });
    if (missingData.length || invalidData.length) {
      alert(
        (missingData.length ? `Missing data fields ${missingData}\n` : '') +
          (invalidData.length ? `invalid data fields ${invalidData}` : ''),
      );
    } else {
      httpCall('CreateAccount', data).then(() => {
        alert('Congrats, you have new account!');
        navigate('/home');
      });
    }
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
    </>
  );
};

export { CreateAccount };
