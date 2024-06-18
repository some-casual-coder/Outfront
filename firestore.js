// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBDaeah3GnlD0C1fR94UXh_HEubVIUFMUs",
  authDomain: "out-front-spa.firebaseapp.com",
  projectId: "out-front-spa",
  storageBucket: "out-front-spa.appspot.com",
  messagingSenderId: "130082804177",
  appId: "1:130082804177:web:26a5310ffeb5735c6e90f0",
  measurementId: "G-DSYNXJWMXW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);