import React from 'react';
import './styles/BadgesList.css';

class BadgesListItem extends React.Component {
  render() {
    return (
      <div className='CharacterCard' style={{ backgroundImage: `url(${this.props.badge.avatarURL})` }}>
        <div className='CharacterCard__name-container text-truncate'>
          <p>
            <strong>
              {this.props.badge.firstName}
              {' '}
              {this.props.badge.lastName}
            </strong>
          </p>
          <p>
            Profession:
            {' '}
            {this.props.badge.jobTitle}
          </p>
          <p className='italic'>
            From:
            {' '}
            {this.props.badge.type}
          </p>
          <p>
            Status:
            {' '}
            {this.props.badge.status}
          </p>
          <p>
            Last location:
            {' '}
            {this.props.badge.lastLocation}
          </p>
        </div>
      </div>
    );
  }
}

export default BadgesListItem;
