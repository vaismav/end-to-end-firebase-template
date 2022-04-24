import { IconButton, InputAdornment, TextField, TextFieldProps } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { ExtraProps } from './types';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const useInput = (id: string, lable: string, hookProps?: ExtraProps, otherProps?: TextFieldProps) => {
  const [isHidden, setIsHidden] = useState<boolean>(hookProps?.shouldHide === true);
  const [value, setValue] = useState<string>(hookProps?.defaultValue || '');
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (hookProps?.defaultValue) {
      setValue(hookProps.defaultValue);
    }
  });

  useEffect(() => {
    if (isValidInput(value)) {
      setIsValid(true);
    }
  }, [value]);

  const isValidInput = (value: string): boolean =>
    value === '' ? true : hookProps?.validateOnChange ? hookProps.validateOnChange(value) : true;

  const handleBlur = () => {
    setIsValid(hookProps?.validateOnChange ? hookProps.validateOnChange(value) : true);
  };

  const onInputError = () => setIsValid(false);

  const handleClickShowPassword = () => {
    setIsHidden((prev) => !prev);
  };

  const endAdornment = hookProps?.shouldHide
    ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
              {isHidden ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }
    : {};

  const element = (
    <TextField
      id={id}
      label={lable}
      variant="outlined"
      {...otherProps}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      error={!isValid}
      InputProps={{
        ...endAdornment,
        type: isHidden ? 'password' : 'text',
      }}
    />
  );

  return { value, element, isValid, onInputError, id };
};

export { useInput };
