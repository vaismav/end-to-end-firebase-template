import { config } from './configs';
import { initializeApp } from 'firebase/app';
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore';
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions';

const firebase = initializeApp(config);

const db = getFirestore(firebase);
connectFirestoreEmulator(db, 'localhost', 8080);

const functions = getFunctions(firebase);
connectFunctionsEmulator(functions, 'localhost', 5001);

export { functions, db, firebase };
export { httpsCallable } from 'firebase/functions';
export { collection, doc, setDoc } from 'firebase/firestore';
