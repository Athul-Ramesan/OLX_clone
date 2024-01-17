import { initializeApp } from 'firebase/app';
import { getFirestore,collection,getDoc } from 'firebase/firestore';
import { getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    
  apiKey: "AIzaSyA5CDN32Z2VsFQTXRdnTuVTz-OevKKbbTo",
  authDomain: "olx-clone-7dc53.firebaseapp.com",
  projectId: "olx-clone-7dc53",
  storageBucket: "olx-clone-7dc53.appspot.com",
  messagingSenderId: "239771726647",
  appId: "1:239771726647:web:cd900daefbbed51d0ba0b2",
  measurementId: "G-FYQ387JFH8"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);  
export const auth =getAuth(app);
export const storage = getStorage(app)



