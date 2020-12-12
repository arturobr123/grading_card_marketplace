import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './styles/Home.css';
import platziconfLogoImage from '../images/platziconf-logo.svg';
import geekLogo from '../images/geek_icon.png';

import {login, logout} from '../actions/userActions';

export default class Home extends Component {
  constructor() {
    super();
    this.state = {
      user: null
    }

    this.login = login.bind(this);
    this.logout = logout.bind(this);
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <div className="row">
            <div className="Home__col col-12 col-md-4">

            <h1>{"Geek API"}</h1>
            <h3>Find the greatest json geek response</h3>
            <Link className="btn btn-primary" to="/badges">
              Start
            </Link>

            {this.state.user ?
              <button onClick={this.logout}>Log Out</button>
              :
              <button onClick={this.login}>Log In</button>
            }
            </div>

            <div className="Home__col d-none d-md-block col-md-8">
              <img
                src={geekLogo}
                alt="Astronauts"
                className="img-fluid p-4"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
