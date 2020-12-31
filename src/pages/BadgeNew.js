import React from 'react';
import firebase from 'firebase';
import './styles/BadgeNew.css';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';

import api from '../api';
import { db } from '../firebaseDB';
import { cardObject } from '../actions/index' ;
import { handleChangeImage, handleChange, submitImage } from '../actions/BadgeActions';
import { setUserToForm } from '../actions/userActions';

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: cardObject,
    previewPhoto: '',
  };

  constructor(props) {
    super(props);

    this.submitImage = submitImage.bind(this);
    this.handleChangeImage = handleChangeImage.bind(this);
    this.handleChange = handleChange.bind(this);
    this.setUserToForm = setUserToForm.bind(this);
  }

  componentDidMount() {
    this.setUserToForm();
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      const imageUrl = await this.submitImage();
      this.setState({ form: { ...this.state.form, avatarURL: imageUrl, timestamp: firebase.firestore.FieldValue.serverTimestamp() } });

      db.collection('cards').add(this.state.form);

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
        <div className='BadgeNew__hero' />

        <div className='container'>
          <div className='row'>
            <div className='col-md-6 col-sm-12'>
              <Badge
                cardName={this.state.form.cardName || 'CARD_NAME'}
                saga={this.state.form.saga || 'SAGA'}
                type={this.state.form.type || 'TYPE'}
                avatarURL={this.state.previewPhoto || 'https://www.gravatar.com/avatar/21594ed15d68ace396564e84?d=identicon'}
                status={this.state.form.status || 'STATUS'}
                gradeCompany={this.state.form.gradeCompany || 'GRADE_COMPANY'}
                grade={this.state.form.grade || 'GRADE'}
                price={this.state.form.price || 'PRICE'}
              />
            </div>

            <div className='col-md-6 col-sm-12'>
              <h1>New Card</h1>
              <BadgeForm
                onChange={this.handleChange}
                onChangeImage={this.handleChangeImage}
                onSubmit={this.handleSubmit}
                formValues={this.state.form}
                error={this.state.error}
              />
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default BadgeNew;
