import React from 'react';

import { getUser, logout } from '../actions/userActions';

import Gravatar from '../components/Gravatar';

class Profile extends React.Component {
  state = {
    user: null,
  }

  constructor(props) {
    super(props);

    this.getUser = getUser.bind(this);
    this.logout = logout.bind(this);
  }

  componentDidMount() {
    this.getUser();
  }

  render() {
    const { user } = this.state;
    return (
      <div>
        <div className='row'>
          <div className='form-group col-6'>
            <label>User</label>

            <div>
              <label>Name: </label>
              {
                user?.displayName
              }
            </div>

            <Gravatar className='Badge__avatar' avatarURL={user?.photoURL} />
          </div>
        </div>
      </div>
    );
  }
}

export default Profile;
