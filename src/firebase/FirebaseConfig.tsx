// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCtinAkYRiWiDgPYvqjpRk5Tt59pjDveuI",
  authDomain: "personal-blog-47fbf.firebaseapp.com",
  databaseURL:
    "https://personal-blog-47fbf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "personal-blog-47fbf",
  storageBucket: "personal-blog-47fbf.firebasestorage.app",
  messagingSenderId: "910885772334",
  appId: "1:910885772334:web:bd52bee1a663c1196b93bf",
  measurementId: "G-4VQH1PP9HZ",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
