import { https } from 'firebase-functions/v1';
import { HttpsError } from 'firebase-functions/v1/https';
import { getRandomInt, log } from './utilities';
import { AccountData } from './utilities/types';
import fetch from 'cross-fetch';

const productionURL = 'https://europe-west1-template-6fa33.cloudfunctions.net/';
const localhost = 'http://localhost:5001/template-6fa33/europe-west1/';

const callCloudFunction = async (functionName: string, data: {} = {}) => {
  let url = localhost ? localhost + functionName : productionURL + functionName;
  return fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ data }),
  });
};

const builtSuccessfully = () => true && getRandomInt(8);

const isAccountDataResponse = (data: any): data is { result: AccountData } => {
  return data?.result?.accountID && data?.result?.branchID;
};

export const legacySystemBuildAccount = async (accountData: any): Promise<AccountData> =>
  await callCloudFunction('BuildAccount', {
    accountID: getRandomInt(99999),
    branchID: 10,
    ...accountData,
  })
    .then((response) => {
      if (response.status >= 400) {
        log(`legacySystemBuildAccount: bad response status`, response);
        throw new HttpsError('aborted', `legacySystemBuildAccount: bad response status`);
      }
      return response.json();
    })
    .then((data) => {
      if (isAccountDataResponse(data)) {
        return {
          accountID: data.result.accountID,
          branchID: data.result.branchID,
        };
      } else {
        log(`legacySystemBuildAccount: response data is missing  accountID or branchID`, data);
        throw new HttpsError('aborted', `legacySystemBuildAccount: response data is missing  accountID or branchID`);
      }
    });

export const buildAccount = (data: any, context: https.CallableContext) => {
  if (builtSuccessfully()) {
    return {
      accountID: getRandomInt(99999),
      branchID: 10,
    };
  }
  throw new HttpsError('cancelled', "Legacy System couldn't build the account");
};
