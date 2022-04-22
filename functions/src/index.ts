import { initializeApp } from 'firebase-admin/app';
const functions = require('firebase-functions');

initializeApp();

const dashboard = require('./dashboard');
exports.dashboard = functions.region('europe-west1').https.onCall(dashboard.hello);

const users = require('./users');
exports.CreateAccount = functions.region('europe-west1').https.onCall(users.createAccount);
