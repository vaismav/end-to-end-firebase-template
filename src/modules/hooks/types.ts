export type ExtraProps = {
  validateOnChange?: (value: any) => boolean;
  defaultValue?: string;
  shouldHide?: boolean;
};

export type SelectOption = {
  value: string;
  label: string;
};
