import { TextField, TextFieldProps } from '@material-ui/core';
import React, { ReactElement, useEffect, useState } from 'react';
import { SelectOption, ExtraProps } from './types';

const useSelect = (
  id: string,
  lable: string,
  options: SelectOption[] = [],
  hookProps?: ExtraProps,
  otherProps?: TextFieldProps,
) => {
  const [selectOptions, setSelectOptions] = useState<SelectOption[]>(options);
  const [value, setValue] = useState<string>(hookProps?.defaultValue ? hookProps.defaultValue : '');
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    if (selectOptions.map((o) => o.value).includes(value)) {
      setIsValid(true);
    }
  }, [value]);

  const handleBlur = () => {
    setIsValid(hookProps?.validateOnChange ? hookProps.validateOnChange(value) : true);
  };

  const onInputError = () => setIsValid(false);

  const updateOptions = (newOptions: SelectOption[]) => setSelectOptions(newOptions);

  const element = (
    <TextField
      id={id}
      label={lable}
      variant="outlined"
      {...otherProps}
      defaultValue={'DEFAULT'}
      select={true}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      error={!isValid}
      SelectProps={{
        native: true,
      }}
    >
      <option value="DEFAULT" disabled>
        Choose option...
      </option>
      {selectOptions.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </TextField>
  );

  return { value, element, isValid, onInputError, id, updateOptions };
};

export { useSelect };
