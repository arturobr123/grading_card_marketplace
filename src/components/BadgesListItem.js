import React from 'react';
import './styles/BadgesList.css';

class BadgesListItem extends React.Component {
  render() {
    const { badge } = this.props;
    return (
      <div className='CharacterCard' style={{ backgroundImage: `url(${badge.avatarURL})` }}>
        <div className='CharacterCard__name-container text-truncate'>
          <p>
            <strong>
              {badge.cardName}
            </strong>
          </p>
          <p>
            Saga:
            {' '}
            {badge.saga}
          </p>
        </div>
      </div>
    );
  }
}

export default BadgesListItem;
