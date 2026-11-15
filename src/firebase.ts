import { initializeApp, getApps, getApp } from 'firebase/app';
import firebaseConfig from '../firebase-applet-config.json';
import { db, auth } from './services/firebase';

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export { db, auth };
export * from './services/firebase';

export default app;
