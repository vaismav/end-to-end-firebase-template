import { initializeApp } from 'firebase-admin/app';
const functions = require('firebase-functions');

initializeApp();

const accounts = require('./accounts');
exports.AccountsInfo = functions.region('europe-west1').https.onCall(accounts.accountsInfo);

const users = require('./users');
exports.CreateAccount = functions.region('europe-west1').https.onCall(users.createAccount);

const legacy = require('./legacySystem');
exports.BuildAccount = functions.region('europe-west1').https.onCall(legacy.buildAccount);
