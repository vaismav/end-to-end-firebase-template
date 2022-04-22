import { firestore } from 'firebase-admin';
export { logger } from 'firebase-functions/v1';

export const db = firestore();
