import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Navbar.css';
import geekLogo from '../images/geek_icon.png';

import { getUser, logout } from '../actions/userActions';

class Navbar extends React.Component {
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
      <div className='Navbar'>
        <div className='container-fluid'>

          {user ?
            // eslint-disable-next-line react/button-has-type
            <button onClick={this.logout}>Log Out</button> : ''
          }

          <div className='row'>
            <div className='col-11'>
              <Link className='Navbar__brand' to='/badges'>
                <img className='Navbar__brand-logo' src={geekLogo} height='40px' alt='Logo' />
                <span className='font-weight-light'> Card </span>
                <span className='font-weight-bold'>MarketPlace</span>
              </Link>
            </div>

            <div className='col-1'>
              {
                user ? (
                  <Link className='Navbar__brand' to='/profileUser'>
                    <img
                      height={45}
                      src={user.photoURL}
                      alt='Avatar'
                    />
                  </Link>
                ) : ''
              }
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Navbar;
