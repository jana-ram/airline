import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig ={
	apiKey: "AIzaSyCSvwqVBtRSLSWvi1fYIkR5i2TUfJQwH1Y",
    authDomain: "react-redux-4c6a8.firebaseapp.com",
    databaseURL: "https://react-redux-4c6a8.firebaseio.com",
    projectId: "react-redux-4c6a8",
    storageBucket: "react-redux-4c6a8.appspot.com",
    messagingSenderId: "818509199184",
    appId: "1:818509199184:web:1782ad11fe135a559f5e55"
};

firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({ experimentalForceLongPolling: true });

export default firebase;
