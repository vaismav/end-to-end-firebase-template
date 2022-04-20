import { functions, httpsCallable, db } from './firebase';
import { doc as firestoreDoc, collection as firestoreCollection } from 'firebase/firestore';

const httpCall = (functionName: string, payload: Object = {}) => httpsCallable(functions, functionName)(payload);

const doc = (path: string, ...pathSegments: string[]) => firestoreDoc(db, path, ...pathSegments);

const collection = (path: string, ...pathSegments: string[]) => firestoreCollection(db, path, ...pathSegments);

export { httpCall, doc, collection };
