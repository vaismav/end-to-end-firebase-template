import { functions, httpsCallable, db, auth } from './firebase';
import { doc as firestoreDoc, collection as firestoreCollection } from 'firebase/firestore';
import {
  signInWithEmailAndPassword,
  onAuthStateChanged as firebaseOnAuthStateChanged,
  NextOrObserver,
  User,
  ErrorFn,
  setPersistence as firebaseSetPersistence,
  browserSessionPersistence,
} from 'firebase/auth';

export const httpCall = (functionName: string, payload: Object = {}) => httpsCallable(functions, functionName)(payload);

export const doc = (path: string, ...pathSegments: string[]) => firestoreDoc(db, path, ...pathSegments);

export const collection = (path: string, ...pathSegments: string[]) => firestoreCollection(db, path, ...pathSegments);

export const signInWithEmail = (email: string, password: string) => signInWithEmailAndPassword(auth, email, password);

export const onAuthStateChanged = (nextOrObserver: NextOrObserver<User>) =>
  firebaseOnAuthStateChanged(auth, nextOrObserver);

export const setPersistence = firebaseSetPersistence(auth, browserSessionPersistence);
