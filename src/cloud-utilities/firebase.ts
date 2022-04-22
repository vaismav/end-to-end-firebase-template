import { config } from './configs';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebase = initializeApp(config);

const db = getFirestore(firebase);

const functions = getFunctions(firebase, 'europe-west1');

if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
}

export { functions, db, firebase };
export { httpsCallable } from 'firebase/functions';
export { collection, doc, setDoc } from 'firebase/firestore';
