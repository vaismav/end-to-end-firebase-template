import { https } from 'firebase-functions/v1';
import { HttpsError } from 'firebase-functions/v1/https';
import { db } from './firebase';
import { log } from './utilities';
import { legacySystemAML, legacySystemATA } from './legacySystem';

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

export const transfer = async (data: any, context: https.CallableContext) => {
  if (!context?.auth?.uid) {
    log('transfer missing uid', data);
    throw new HttpsError('unauthenticated', 'invalid user');
  }

  if (context?.auth?.token?.exp && context?.auth?.token?.exp > new Date().getTime()) {
    log('transfer: expired session token', data);
    throw new HttpsError('unauthenticated', 'expired session token');
  }

  if (!data?.srcAccount || !data?.amount || !data?.dstAccount || !data?.dstBranch || !data?.dstName) {
    log('transfer: missing srcAccount, amount, account, dstAccount, dstBranch, or name', data);
    throw new HttpsError('failed-precondition', 'missing data');
  }

  const amount = parseInt(data?.amount);
  const dstBranch = parseInt(data?.dstBranch);

  if (!amount || amount <= 0 || !dstBranch) {
    log('transfer: missing amount or dstBrancharnt valid', data);
    throw new HttpsError('failed-precondition', 'missing data');
  }

  checkAmlAta(data)
    .then((isApproved) => {
      console.log(`is approved ${isApproved}`);
      if (isApproved) {
        let docRef = db.doc(`/users/${context?.auth?.uid}/accounts/${data.srcAccount}`);
        updateAccountBalance(-1 * amount, docRef);
      }
    })
    .catch((e) => {
      log('transfer: checkAmlAta: Error', e);
      throw new HttpsError('unknown', 'something went wrong');
    });

  return 'success';
};

const updateAccountBalance = (
  amount: number,
  docRef: FirebaseFirestore.DocumentReference<FirebaseFirestore.DocumentData>,
) => {
  if (typeof amount !== 'number' || !docRef) {
    log(`updateAccountBalance: amount or docRef are invalid. amount type:${typeof amount} `, docRef);
    throw Error('amount or docRef are invalid');
  }

  return db.runTransaction((transaction) => {
    return transaction.get(docRef).then((accountDoc) => {
      if (!accountDoc.exists) {
        throw Error('Document does not exist!');
      }

      const currentBalance = accountDoc.data()?.balance || 0;

      transaction.update(docRef, { balance: currentBalance + amount });
    });
  });
};

const checkAmlAta = async (data: any): Promise<boolean> => {
  const checks: Promise<boolean>[] = [legacySystemAML(data), legacySystemATA(data)];

  return Promise.all(checks).then((responses) => responses.reduce((acc, curr) => acc && curr, true));
};
