import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCVR7G6ldRWT87di-GzrUBZHmBUsNTrQkw",
    authDomain: "multi-vendor-groceries-app.firebaseapp.com",
    databaseURL: "https://multi-vendor-groceries-app-default-rtdb.firebaseio.com",
    projectId: "multi-vendor-groceries-app",
    storageBucket: "multi-vendor-groceries-app.appspot.com",
    messagingSenderId: "292243233228",
    appId: "1:292243233228:web:11d5cc23127208c67d6569"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };