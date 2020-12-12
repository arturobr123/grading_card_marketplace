import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';
import {db} from '../firebaseDB';

class ProfilePage extends Component {

  fileUploader = React.createRef();

  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      type:'',
      avatarURL:''
    },
    files: []
  };

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async e => {
    this.setState({ loading: true, error: null });

    db.child(this.props.match.params.badgeId).once('value', snapshot => {
      const values = snapshot.val();

      const data = {
        ...values,
        id: this.props.match.params.badgeId,
      }

      this.setState({ loading: false, form: data });
    }, (error) => {
        this.setState({ loading: false, error: error });
    })
  };

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };

  handleUploadSuccess = filename => {
    this.setState({ avatar: filename, progress: 100, isUploading: false });
    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then((url) => {
        this.setState({ form:{avatarURL: url}});
        this.setState({avatarURL: url});
        this.handleSubmit();
      });
  };

  handleSubmit = async e => {
    try {
      db.child(this.props.match.params.badgeId).child("avatarURL").set(this.state.form.avatarURL);
      this.setState({ loading: false });

      this.props.history.push('/badges');
    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  customOnChangeHandler = (event) => {
    const { target: { files } } = event;

    this.setState({ files: [files] });
    this.setState({photoPreview: URL.createObjectURL(files[0])});
  }

  startUploadManually = (e) => {
    e.preventDefault();
    const { files } = this.state;
    files.forEach(file => {
      this.fileUploader.startUpload(file[0])
    });

    console.log("done");
  }

  render() {
    return (
      <div>
        <img src={this.state.photoPreview} />

        <FileUploader
          accept="image/*"
          name="avatarURL"
          randomizeFilename
          storageRef={firebase.storage().ref("images")}
          onUploadError={this.handleUploadError}
          onUploadSuccess={this.handleUploadSuccess}
          onProgress={this.handleProgress}
          onChange={this.customOnChangeHandler}
          ref={instance => { this.fileUploader = instance; } }
        />

        <button onClick={this.startUploadManually}>Upload all the things</button>
      </div>
    );
  }
}

export default ProfilePage;
