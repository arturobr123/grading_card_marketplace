import React from 'react';

import './styles/Badge.css';
import geekLogo from '../images/geek_icon.png';
import Gravatar from './Gravatar';

class Badge extends React.Component {
  render() {
    const { avatarURL, cardName, saga, type, status, gradeCompany, grade, price } = this.props;
    return (
      <div className='Badge'>

        <div className='Badge__section-name'>
          <Gravatar className='Badge__avatar' avatarURL={avatarURL} />
          <h1>
            {cardName}
          </h1>
        </div>

        <div className='Badge__section-info'>
          <h3>{saga}</h3>
          <div>
            Type:
            {' '}
            {type}
          </div>
          <div>
            Status:
            {' '}
            <strong>{status}</strong>
            {' '}
          </div>

          <div>
            Grade Company:
            {' '}
            <strong>{gradeCompany}</strong>
          </div>

          <div>
            Grade:
            {' '}
            <strong>{grade}</strong>
          </div>

          <div>
            Price:
            {' '}
            <strong>{price}</strong>
          </div>
        </div>
      </div>
    );
  }
}

export default Badge;
