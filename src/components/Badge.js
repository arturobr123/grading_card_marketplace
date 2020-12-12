import React from 'react';

import './styles/Badge.css';
import geekLogo from '../images/geek_icon.png';
import Gravatar from './Gravatar';

class Badge extends React.Component {
  render() {
    return (
      <div className='Badge'>

        <div className='Badge__section-name'>
          <Gravatar className='Badge__avatar' avatarURL={this.props.avatarURL} />
          <h1>
            {this.props.firstName}
            {' '}
            <br />
            {' '}
            {this.props.lastName}
          </h1>
        </div>

        <div className='Badge__section-info'>
          <h3>{this.props.jobTitle}</h3>
          <div>
            From:
            {' '}
            {this.props.type}
          </div>
          <div>
            Status:
            {' '}
            <strong>{this.props.status}</strong>
            {' '}
          </div>
          <div>
            Last location:
            {' '}
            {this.props.lastLocation}
            {' '}
          </div>
        </div>
      </div>
    );
  }
}

export default Badge;
