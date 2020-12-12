import React from 'react';

import './styles/BadgeNew.css';
import PageLoading from '../components/PageLoading';
import { db } from '../firebaseDB';
import { handleChange } from '../actions/BadgeActions';
import { setUserToForm } from '../actions/userActions';

class NewScore extends React.Component {
  state = {
    loading: false,
    error: null,
    form: {
      score: 5,
      comment: '',
      user_uid: 'invited',
    },
  };

  constructor(props) {
    super(props);

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
      db.child(this.props.match.params.badgeId).child('scores').push(this.state.form);

      this.setState({ loading: false });
      this.props.history.push(`/badges/${this.props.match.params.badgeId}`);

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
              <h1>New Score</h1>

              <form onSubmit={this.handleSubmit}>

                <div className='row'>
                  <div className='form-group col-6'>
                    <label>Score</label>
                    <input
                      required
                      onChange={this.handleChange}
                      className='form-control'
                      type='text'
                      name='score'
                      value={this.state.form.score}
                    />
                  </div>

                  <div className='form-group col-6'>
                    <label>Comment</label>
                    <input
                      onChange={this.handleChange}
                      className='form-control'
                      type='text'
                      name='comment'
                      value={this.state.form.comment}
                    />
                  </div>
                </div>

                <button className='btn btn-primary'>
                  Save
                </button>

                {this.props.error && (
                  <p className='text-danger'>{this.state.error.message}</p>
                )}
              </form>

            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default NewScore;
