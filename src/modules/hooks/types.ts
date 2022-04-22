export type ExtraProps = {
  validateOnChange?: (value: any) => boolean;
  defaultValue?: string;
};

export type SelectOption = {
  value: string;
  label: string;
};
