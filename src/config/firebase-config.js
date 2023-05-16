import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyDO1BV-DSM-aBekyWCWp3ppBSa2setwano",
    authDomain: "yfu-database.firebaseapp.com",
    projectId: "yfu-database",
    storageBucket: "yfu-database.appspot.com",
    messagingSenderId: "584129224707",
    appId: "1:584129224707:web:31eddf69ccfc84d39a2e36"
};

initializeApp(firebaseConfig);

const auth = getAuth();

export { auth };