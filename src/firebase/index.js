// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDlou7wTT0Z32zQABY3fqSQFXsuRi85hko",
  authDomain: "apbuenosaires-f35da.firebaseapp.com",
  projectId: "apbuenosaires-f35da",
  storageBucket: "apbuenosaires-f35da.appspot.com",
  messagingSenderId: "375263423137",
  appId: "1:375263423137:web:07a8606f4c1b158f049ee0",
  measurementId: "G-B133W6HYC6"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { db, storage, auth };

