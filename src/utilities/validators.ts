export const emailValidation = (value: string): boolean =>
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value,
  );

export const positiveNumber = (value: string): boolean => /^[1-9]+[0-9]*$/.test(value);

export const areInputsValid = (data: any[]): boolean => {
  let missingData: string[] = [];
  let invalidData: string[] = [];
  data.forEach((field) => {
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
    return false;
  }

  return true;
};
