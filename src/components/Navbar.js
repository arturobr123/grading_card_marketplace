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

    const publicUrl = `${process.env.PUBLIC_URL}/`;
    const imgattr = 'logo';
    const anchor = '#';
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
              <p className='details'>Donsectetur elit, sed do eiusmod tempor ut labore et dolore magna aliqua. </p>
              <div className='address-inner'>
                <h5>Address</h5>
                <p>3538 Cambridge Place Laurel, MD 20707</p>
              </div>
              <div className='address-inner'>
                <h5>Phone</h5>
                <p>410-565-2575</p>
              </div>
              <div className='address-inner mb-0'>
                <h5>Email</h5>
                <p>JohnPMills@dmarket.com</p>
              </div>
            </div>
            <div className='dkt-market-earn'>
              <div className='address-inner'>
                <h5>Market Earning</h5>
                <p>online store with lots of digital product and exclusive Item</p>
              </div>
              <div className='row'>
                <div className='col-lg-6'>
                  <div className='earn-inner'>
                    <p>Item Sold</p>
                    <h5>12501</h5>
                  </div>
                </div>
                <div className='col-lg-6'>
                  <div className='earn-inner'>
                    <p>Total Earning</p>
                    <h5>25804</h5>
                  </div>
                </div>
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
              <div className='nav-right-part nav-right-part-mobile'>
                <a className='btn btn-base' href='#'>Sign in</a>
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
                    <a href='#'>
                      <img src={`${publicUrl}assets/img/icon/2m.png`} alt='icon' />
                      0 Items
                    </a>

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

