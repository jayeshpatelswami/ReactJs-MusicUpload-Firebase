// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD62LTJlK3ouZgLZWc1wa4vaXint1wlooc",
  authDomain: "musicupload-edb9b.firebaseapp.com",
  projectId: "musicupload-edb9b",
  storageBucket: "musicupload-edb9b.appspot.com",
  messagingSenderId: "897031768392",
  appId: "1:897031768392:web:66dda7e80139d5ff15cb7d",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const Storage = getStorage(app);
