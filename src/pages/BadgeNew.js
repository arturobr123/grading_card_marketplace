import React from 'react';

import './styles/BadgeNew.css';
import header from '../images/platziconf-logo.svg';
import Badge from '../components/Badge';
import BadgeForm from '../components/BadgeForm';
import PageLoading from '../components/PageLoading';
import api from '../api';
import {db} from '../firebaseDB';
import {handleChangeImage, handleChange, submitImage} from "../actions/BadgeActions";

class BadgeNew extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      firstName: '',
      lastName: '',
      jobTitle: '',
      type:'',
      avatarURL:'',
      status:'Alive',
      lastLocation:''
    },
    previewPhoto:'',
    toUploadPhoto: ''
  };

  constructor(props){
    super(props);

    this.submitImage = submitImage.bind(this);
    this.handleChangeImage = handleChangeImage.bind(this);
    this.handleChange = handleChange.bind(this);
  }

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ loading: true, error: null });

    try {
      const imageUrl = await this.submitImage();
      this.setState({form: { ...this.state.form, avatarURL: imageUrl}});

      db.push(this.state.form);

      this.setState({ loading: false });
      this.props.history.push('/badges');

    } catch (error) {
      this.setState({ loading: false, error: error });
    }
  };

  render() {
    if (this.state.loading) {
      return <PageLoading />;
    }

    return (
      <React.Fragment>
        <div className="BadgeNew__hero">
        </div>

        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12">
              <Badge
                firstName={this.state.form.firstName || 'FIRST_NAME'}
                lastName={this.state.form.lastName || 'LAST_NAME'}
                jobTitle={this.state.form.jobTitle || 'JOB_TITLE'}
                type={this.state.form.type || 'TYPE'}
                avatarURL={this.state.previewPhoto || "https://www.gravatar.com/avatar/21594ed15d68ace396564e84?d=identicon"}
                status={this.state.form.status || 'STATUS'}
                lastLocation={this.state.form.lastLocation || 'LAST_LOCATION'}
              />
            </div>

            <div className="col-md-6 col-sm-12">
              <h1>New Character</h1>
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
