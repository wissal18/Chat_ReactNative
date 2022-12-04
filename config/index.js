// Import the functions you need from the SDKs you need
import app from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/database";
import "firebase/compat/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDiRtAdo3Gvx5LQ_TD6RgJ0PIN8FM_JDYE",
  authDomain: "tpmobile-5cd8c.firebaseapp.com",
  databaseURL: "https://tpmobile-5cd8c-default-rtdb.firebaseio.com",
  projectId: "tpmobile-5cd8c",
  storageBucket: "tpmobile-5cd8c.appspot.com",
  messagingSenderId: "1064115784656",
  appId: "1:1064115784656:web:dd0cb7c51dc746b46a07d5",
};

// Initialize Firebase
const initfirebase = app.initializeApp(firebaseConfig);
export default initfirebase;
