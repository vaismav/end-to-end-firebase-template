export type CreatAccountData = {
  firstName: string;
  lastName: string;
  identityNumber: string;
  maritalStatus: 'single' | 'married' | 'divorced';
  employmentStatus: 'employed' | 'unemployed' | 'retired';
  homeAddress: string;
  email: string;
  phoneNumber: string;
  password?: string;
};

export type AccountData = {
  accountID: number;
  branchID: number;
};
