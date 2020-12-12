import React, { Component } from "react";
import firebase from "firebase";
import FileUploader from "react-firebase-file-uploader";
import CustomUploadButton from 'react-firebase-file-uploader/lib/CustomUploadButton';

class ProfilePage extends Component {

  fileUploader = React.createRef();

  state = {
    files: [],
  };

  handleChangeUsername = event =>
    this.setState({ username: event.target.value });

  handleUploadStart = () => this.setState({ isUploading: true, progress: 0 });

  handleProgress = progress => this.setState({ progress });

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
      .then(url => this.setState({ avatarURL: url }));
  };


  customOnChangeHandler = (event) => {
    const { target: { files } } = event;
    const filesToStore = [];

    console.log(files);

    [files].forEach(file => filesToStore.push(file));

    this.setState({ files: filesToStore });

    console.log(filesToStore);
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
        <form>
          <label>Username:</label>
          <input
            type="text"
            value={this.state.username}
            name="username"
            onChange={this.handleChangeUsername}
          />
          <label>Avatar:</label>
          {this.state.isUploading && <p>Progress: {this.state.progress}</p>}
          {this.state.avatarURL && <img src={this.state.avatarURL} />}

          <FileUploader
            accept="image/*"
            name="avatar"
            randomizeFilename
            storageRef={firebase.storage().ref("images")}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
            onChange={this.customOnChangeHandler}
            ref={instance => { this.fileUploader = instance; } }
          />

          <button onClick={this.startUploadManually}>Upload all the things</button>
        </form>
      </div>
    );
  }
}

export default ProfilePage;
