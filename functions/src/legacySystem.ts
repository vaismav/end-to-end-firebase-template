import { HttpsError } from 'firebase-functions/v1/https';
import { getRandomInt } from './utilities';
import { AccountData } from './utilities/types';

// const productionURL = 'https://europe-west1-template-6fa33.cloudfunctions.net/';
// const localhost = 'http://localhost:5001/'

// const callCloudFunction = async (functionName: string, data: {} = {}) => {
//     let url = localhost ? localhost + functionName : productionURL + functionName;
//     await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ data }),
//     })
// }

const builtSuccessfully = () => true && getRandomInt(8);

export const legacySystemBuildAccount = async (accountData: any): Promise<AccountData> =>
  new Promise<AccountData>((resolve, reject) => {
    if (builtSuccessfully()) {
      // callCloudFunction('BuildAccount', {
      //     accountID: getRandomInt(99999),
      //     branchID: 10,
      //     ...accountData
      // })
      resolve({
        accountID: getRandomInt(99999),
        branchID: 10,
      });
    }
    reject(new HttpsError('cancelled', 'failed to build new account'));
  });
