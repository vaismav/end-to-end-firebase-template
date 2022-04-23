import { TextField, TextFieldProps } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { ExtraProps } from './types';

const useInput = (id: string, lable: string, hookProps?: ExtraProps, otherProps?: TextFieldProps) => {
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

  const element = (
    <TextField
      id={id}
      label={lable}
      variant="outlined"
      {...otherProps}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      error={!isValid}
    />
  );

  return { value, element, isValid, onInputError, id };
};

export { useInput };
