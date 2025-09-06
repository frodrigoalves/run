// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getMessaging } from "firebase/messaging";
import { getFunctions } from "firebase/functions";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCt--Q6gzMzpuuzh0DpNptoLd3aw-huHv0",
  authDomain: "feedback-flow-rx2gz.firebaseapp.com",
  projectId: "feedback-flow-rx2gz",
  storageBucket: "feedback-flow-rx2gz.firebasestorage.app",
  messagingSenderId: "752403504345",
  appId: "1:752403504345:web:15f55b23d4464954c4b2c8",
  measurementId: "G-VB48XBH0PH"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

let analytics;
let messaging;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
  messaging = getMessaging(app);
}
const functions = getFunctions(app);

export { app, analytics, messaging, functions };
