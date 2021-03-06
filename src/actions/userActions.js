import firebase, { auth, provider } from '../firebaseInitializeApp';

export function getUser() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        user,
      });

      console.log(this.state.user);
    }
  });
}

export function setUserToForm() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        form: {
          ...this.state.form,
          user_uid: user.uid,
          user_name: user.displayName,
        },
      });
    }
  });
}

export function setUserToState() {
  auth.onAuthStateChanged((user) => {
    if (user) {
      this.setState({
        ...this.state,
        user_uid: user.uid,
      });
    }
  });
}

export function logout() {
  auth.signOut()
    .then(() => {
      this.setState({
        user: null,
      });

      window.location = '/';
    });
}

//do not use setState in functional component
export function logoutFunctionalComponent() {
  auth.signOut()
    .then(() => {
      window.location = '/';
    });
}

export function login() {
  auth.signInWithPopup(provider)
    .then((result) => {
      const { user } = result;
      this.setState({
        user,
      });

      this.props.history.push('/badges');
    });
}
