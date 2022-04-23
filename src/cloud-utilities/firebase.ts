import { config } from './configs';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';
import { getAuth, connectAuthEmulator } from 'firebase/auth';

const firebase = initializeApp(config);

const db = getFirestore(firebase);

const functions = getFunctions(firebase, 'europe-west1');

const auth = getAuth(firebase);

if (location.hostname === 'localhost') {
  connectFirestoreEmulator(db, 'localhost', 8080);
  connectFunctionsEmulator(functions, 'localhost', 5001);
  connectAuthEmulator(auth, 'http://localhost:9099');
}

export { functions, db, firebase, auth };
export { httpsCallable } from 'firebase/functions';
export { collection, doc, setDoc } from 'firebase/firestore';
