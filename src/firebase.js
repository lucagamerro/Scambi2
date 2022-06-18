import firebase from 'firebase';
import 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyD20nV3v_M0jfuO8RCtedTDneUva-USbP0",
    authDomain: "scambi-gasquemais.firebaseapp.com",
    projectId: "scambi-gasquemais",
    storageBucket: "scambi-gasquemais.appspot.com",
    messagingSenderId: "893102789014",
    appId: "1:893102789014:web:b0502d0b53837114070db7",
    measurementId: "G-01ZKV4EB0R"
};

firebase.initializeApp(firebaseConfig);

export default firebase;
