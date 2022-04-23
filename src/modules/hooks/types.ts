export type ExtraProps = {
  validateOnChange?: (value: any) => boolean;
  defaultValue?: string;
  isHidden?: boolean;
};

export type SelectOption = {
  value: string;
  label: string;
};
