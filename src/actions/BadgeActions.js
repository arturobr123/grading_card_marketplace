import firebase from 'firebase';

export function handleChangeImage(e) {
  this.setState({ previewPhoto: URL.createObjectURL(e.target.files[0]) });
  this.setState({ toUploadPhoto: e.target.files[0] });
}

export function handleChange(e) {
  console.log(this.state.form);

  this.setState({
    form: {
      ...this.state.form,
      [e.target.name]: e.target.value,
    },
  });

  console.log(this.state);
};

export function submitImage() {
  return new Promise((resolve, reject) => {
    const storageRef = firebase.storage().ref(`images/${this.state.toUploadPhoto.name}`);
    const task = storageRef.put(this.state.toUploadPhoto);

    task.on('state_changed', (snapshot) => {
      // Se lanza durante el progreso de subida
    }, (error) => {
      reject(error);
    }, () => {
      task.snapshot.ref.getDownloadURL().then((url) => {
        resolve(url);
      });
    });

  });
}
