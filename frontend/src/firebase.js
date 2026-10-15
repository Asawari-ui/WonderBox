
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAMJbXjNPLMdZmxZkFA690VPbyZURFyNpk",
  authDomain: "wonderbox-c9804.firebaseapp.com",
  projectId: "wonderbox-c9804",
  storageBucket: "wonderbox-c9804.firebasestorage.app",
  messagingSenderId: "144057297189",
  appId: "1:144057297189:web:121e16accbcb269e1812cc",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
