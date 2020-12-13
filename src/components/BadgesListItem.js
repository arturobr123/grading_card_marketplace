import React from 'react';
import './styles/BadgesList.css';

import { Card, Button } from 'react-bootstrap';

class BadgesListItem extends React.Component {
  render() {
    const { badge } = this.props;
    return (
      <Card>
        <Card.Img style={{ height: '24rem' }} variant='top' src={badge.avatarURL} />
        <Card.Body>
          <Card.Title>{badge.cardName}</Card.Title>
          <Card.Text>
            {badge.saga}
          </Card.Text>
        </Card.Body>
      </Card>
    );
  }
}

export default BadgesListItem;
