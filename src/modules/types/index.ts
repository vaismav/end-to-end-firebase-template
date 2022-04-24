export interface LooseObject {
  [key: string]: any;
}

export type AccountData = {
  accountID?: number;
  branchID?: number;
  balance?: number;
} & LooseObject;
