import * as firebase from 'firebase';
import config from './firebaseConfig';

firebase.initializeApp(config);

export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();
