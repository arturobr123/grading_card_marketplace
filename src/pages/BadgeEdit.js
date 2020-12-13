import React from 'react';

import './styles/BadgeEdit.css';
import firebase from 'firebase';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';
import { db } from '../firebaseDB';
import { handleChange, handleChangeImage, submitImage } from '../actions/BadgeActions';

class BadgeEdit extends React.Component {
  state = {
    loading: true,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      type: '',
      avatarURL: '',
      status: '',
      lastLocation: '',
    },
    previewPhoto: '',
    toUploadPhoto: '',
  };

  constructor(props) {
    super(props);

    this.submitImage = submitImage.bind(this);
    this.handleChangeImage = handleChangeImage.bind(this);
    this.handleChange = handleChange.bind(this);
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = async (e) => {
    const { params } = this.props.match;
    this.setState({ loading: true, error: null });

    db.collection('cards').doc(params.badgeId).onSnapshot((snapshot) => {
      const values = snapshot.data();

      const data = {
        ...values,
        id: params.badgeId,
      };

      this.setState({ loading: false, form: data, previewPhoto: data.avatarURL });
    }, (error) => {
      this.setState({ loading: false, error });
    });
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    const { form } = this.state;

    try {
      if (this.state.toUploadPhoto) {
        const imageUrl = await this.submitImage();
        this.setState({ form: { ...form, avatarURL: imageUrl, timestamp: firebase.firestore.FieldValue.serverTimestamp() } });
      }

      db.collection('cards').doc(this.props.match.params.badgeId).update(form);

      this.setState({ loading: false });
      this.props.history.push('/badges');

    } catch (error) {
      this.setState({ loading: false, error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className='BadgeEdit__hero' />

        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                type={this.state.form.type || 'TYPE'}
                avatarURL={this.state.previewPhoto || 'https://www.gravatar.com/avatar/21594ed15d68ace396564e84?d=identicon'}
                status={this.state.form.status || 'STATUS'}
                lastLocation={this.state.form.lastLocation || 'LAST_LOCATION'}
              />
            </div>

            <div className='col-md-6 col-sm-12'>
              <h1>Edit Character</h1>
              <BadgeForm
                onChange={this.handleChange}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                onChangeImage={this.handleChangeImage}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeEdit;
