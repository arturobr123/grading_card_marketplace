import firebase from './firebaseInitializeApp';

const databaseRef = firebase.database().ref();
export const db = firebase.firestore();
