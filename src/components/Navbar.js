import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Navbar.css';
import geekLogo from '../images/geek_icon.png';

import { getUser, logout } from '../actions/userActions';

import firebase, { auth, provider } from '../firebaseInitializeApp.js';

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
    return (
      <div className='Navbar'>
        <div className='container-fluid'>

          {this.state.user ?
            <button onClick={this.logout}>Log Out</button> : ''
          }

          <Link className='Navbar__brand' to='/badges'>
            <img className='Navbar__brand-logo' src={geekLogo} height='40px' alt='Logo' />
            <span className='font-weight-light'> Card </span>
            <span className='font-weight-bold'>MarketPlace</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default Navbar;
