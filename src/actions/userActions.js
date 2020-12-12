import firebase, { auth, provider } from '../firebaseInitializeApp.js';

export function getUser(){
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        user
      });

      console.log(this.state.user)
    }
  });
}

export function setUserToForm(){
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        form: {
          ...this.state.form,
          user_uid: user.uid,
        },
      });
    }
  });
}

export function logout(){
  auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });

      window.location = '/';
    });
}

export function login(){
  auth.signInWithPopup(provider)
    .then((result) => {
      const user = result.user;
      this.setState({
        user
      });

      this.props.history.push('/badges');
    });
}
