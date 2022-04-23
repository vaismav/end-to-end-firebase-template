import { https } from 'firebase-functions/v1';
import { HttpsError } from 'firebase-functions/v1/https';
import { db } from './firebase';
import { log } from './utilities';

export const accountsInfo = async (data: any, context: https.CallableContext) => {
  if (!context?.auth?.uid) {
    log('accountsInfo missing uid');
    throw new HttpsError('unauthenticated', 'invalid user');
  }
  if (context?.auth?.token?.exp && context?.auth?.token?.exp > new Date().getTime()) {
    log('accountsInfo: expired session token');
    throw new HttpsError('unauthenticated', 'expired session token');
  }

  return getAccountData(context.auth.uid);
};

const getAccountData = async (uid: string) => {
  return db
    .collection(`users/${uid}/accounts`)
    .get()
    .then((snapshot) => {
      let data = snapshot.docs.map((doc) => ({
        accountID: doc.id,
        branchID: doc.data().branchID,
        balance: doc.data().balance,
      }));

      return data;
    })
    .catch((e) => {
      log('Error: getAccountData while querying for accounts in db ', e);
      throw new HttpsError('unknown', ' something went wrong');
    });
};
