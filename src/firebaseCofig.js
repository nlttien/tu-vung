// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDiSJZEohouFf663y7FDDJi9im3tvmeeUA",
  authDomain: "tu-vung-447ad.firebaseapp.com",
  projectId: "tu-vung-447ad",
  storageBucket: "tu-vung-447ad.appspot.com",
  messagingSenderId: "495745716768",
  appId: "1:495745716768:web:f79197a069025b0863e245",
  measurementId: "G-7701ZQ11EV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);