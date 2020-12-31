import React from 'react';
import { Link } from 'react-router-dom';

import './styles/Navbar.css';

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

    const publicUrl = `${process.env.PUBLIC_URL}/`;
    return (
      <div>
        <div className='dkt-sitebar-menu'>
          <div className='dkt-sitebar-menu'>
            <span className='dkt-sitebar-close'><i className='fa fa-times' /></span>
            <div className='dkt-details-inner'>
              <div className='logo go-top'>
                <Link to='/badges'>
                  <h3>Card MarketPlace</h3>
                  {' '}
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className='navbar-area navbar-area-2 go-top'>
          <nav className='navbar navbar-expand-lg'>
            <div className='container nav-container'>
              <div className='responsive-mobile-menu'>
                <button type='button' className='menu toggle-btn d-block d-lg-none' data-target='#dkt_main_menu' aria-expanded='false' aria-label='Toggle navigation'>
                  <span className='icon-left' />
                  <span className='icon-right' />
                </button>
              </div>
              <div className='logo'>
                <Link className='main-logo' to='/badges'><h3>Card MarketPlace</h3></Link>
              </div>
              <div className='collapse navbar-collapse' id='dkt_main_menu'>
                <ul className='navbar-nav menu-open'>
                  <li>
                    <Link to='/badges/new'>
                      Add New Card
                    </Link>
                  </li>
                </ul>
              </div>
              <div className='nav-right-part nav-right-part-desktop'>
                <ul>
                  <li>
                    <Link to='/'>
                      <img src={`${publicUrl}assets/img/icon/2m.png`} alt='icon' />
                      0 Items
                    </Link>
                  </li>
                  <li>
                    {
                      user ? (
                        <Link to='/profileUser'>
                          <img
                            height={30}
                            src={user.photoURL}
                            alt='Avatar'
                          />
                        </Link>
                      ) : ''
                    }
                  </li>
                  <li className='menu-bar dropdown-menu-btn'><i className='fa fa-bars' /></li>
                </ul>
              </div>
            </div>
          </nav>
        </div>
      </div>

    );
  }
}

export default Navbar;

