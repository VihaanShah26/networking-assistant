// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { useEffect, useState } from 'react';
import { get, getDatabase, onValue, ref, update } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { useCallback } from 'react';
import { getAuth, getRedirectResult, GoogleAuthProvider, onAuthStateChanged, signInWithPopup, signInWithRedirect, signOut } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBTDWgJ64yVREMN7q1xauXXIpfXV08MiqE",
    authDomain: "optimized-networking-tool.firebaseapp.com",
    projectId: "optimized-networking-tool",
    storageBucket: "optimized-networking-tool.firebasestorage.app",
    messagingSenderId: "381338206311",
    appId: "1:381338206311:web:ae27dcb1b13dd7326e54c2",
    measurementId: "G-6W18BWWF7L"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const database = getDatabase(app);
export const db = getFirestore(app);

const firebaseSignOut = () => signOut(getAuth(app));

export const signInWithGoogle = async () => {
    const result = await signInWithPopup(getAuth(app), new GoogleAuthProvider());
    const user = result.user;
};

export { firebaseSignOut as signOut };

export const useAuthState = () => {
    const [user, setUser] = useState();

    useEffect(() => (
        onAuthStateChanged(getAuth(app), setUser)
    ), []);

    return [user];
};

export const auth = getAuth(app);

export const storage = getStorage(app);