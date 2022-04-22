import { https } from 'firebase-functions';
import { EMAIL_REGEX, ISRAEL_PHONE_NUMBERS_REGEX, STRONG_PASSWORD_REGEX } from './utilities/regex';
import { log } from './utilities';
import { HttpsError } from 'firebase-functions/v1/https';
import { auth } from 'firebase-admin';
import { db } from './firebase';
import { legacySystemBuildAccount } from './legacySystem';
import { AccountData, CreatAccountData } from './utilities/types';

const accountDataMandatoryKeys: string[] = [
  'firstName',
  'lastName',
  'identityNumber',
  'maritalStatus',
  'employmentStatus',
  'homeAddress',
  'email',
  'phoneNumber',
  'password',
];

const isMandatoryDataValid = (input: any, inputType: string): boolean => {
  switch (inputType) {
    case 'firstName':
    case 'lastName':
      return typeof input === 'string' && /^[a-zA-Z]+$/.test(input);
    case 'identityNumber':
      return typeof input === 'string' && input.replace(/\D/g, '').length === 9;
    case 'maritalStatus':
      return ['single', 'married', 'divorced'].includes(input);
    case 'employmentStatus':
      return ['employed', 'unemployed', 'retired'].includes(input);
    case 'homeAddress':
      //TODO implement address validation to check address really exist
      return typeof input === 'string';
    case 'email':
      return typeof input === 'string' && EMAIL_REGEX.test(input);
    case 'phoneNumber':
      return typeof input === 'string' && ISRAEL_PHONE_NUMBERS_REGEX.test(input);
    case 'password':
      return typeof input === 'string' && STRONG_PASSWORD_REGEX.test(input);
    default:
      return true;
  }
};

const getUserDataWithoutPassword = (data: CreatAccountData) => {
  const { password, ...user } = data;
  return user;
};

export const createAccount = async (data: any, context: https.CallableContext) => {
  accountDataMandatoryKeys.forEach((key) => {
    if (!data[key] || !isMandatoryDataValid(data[key], key)) {
      log(`Error: createAccount: invalid data: missing value of ${key} `, data);
      return new HttpsError('failed-precondition', 'missing data');
    }
  });

  legacySystemBuildAccount(data)
    .then((response: AccountData) => {
      if (!response.accountID || !response.branchID) {
        log(`Error: createAccount: legacy system response missing account or branch `, response);
        return new HttpsError('internal', 'something went wrong');
      }
      return buildAccount({ ...data, ...response });
    })
    .catch((e) => {
      log('Error: createAccount: legacySystemBuildAccount()', e);
      return new HttpsError('internal', 'something went wrong');
    });
};

const createUser = (data: CreatAccountData): Promise<boolean> => {
  return auth()
    .createUser({
      uid: data.identityNumber,
      email: data.email,
      emailVerified: false,
      phoneNumber: data.phoneNumber,
      password: data.password,
      displayName: `${data.firstName} ${data.lastName}`,
      disabled: false,
    })
    .then((userRecord) =>
      db
        .collection('users')
        .doc(userRecord.uid)
        .set(getUserDataWithoutPassword(data))
        .then(() => {
          return true;
        })
        .catch((err) => {
          console.log('Error:  ', err);
          return false;
        }),
    )
    .catch((e) => {
      console.log('e: ', e);
      return false;
    });
};

export const buildAccount = async (data: CreatAccountData & AccountData) => {
  const docRef = db.doc(`users/${data.identityNumber}`);
  return docRef
    .get()
    .then(async (doc) => {
      if (!doc.exists) {
        if (!(await createUser(data))) {
          log('buildAccount: failed to create new user');
          return new HttpsError('aborted', ' failed to create new user');
        }

        await docRef.create(getUserDataWithoutPassword(data)).catch((e) => {
          log('buildAccount: failed to create new user doc', e);
          return new HttpsError('aborted', ' failed to create new user');
        });
      }
      db.doc(`users/${data.identityNumber}/accounts/${data.accountID}`)
        .create({
          branchID: data.branchID,
          balance: 0,
        })
        .then(() => {
          data.accountID, data.branchID;
        });
    })
    .catch((e) => {
      log('buildAccount: failed to create new user account', e);
      return new HttpsError('internal', ' failed to create new user');
    });
};
