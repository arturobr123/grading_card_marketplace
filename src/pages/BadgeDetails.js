import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgeDetails.css';
import Badge from '../components/Badge';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

function BadgeDetails(props) {
  const { badge } = props;

  const thereAreComments = !!badge.scores;

  let scores = badge.scores ? badge.scores : [{ score: 5 }];

  scores = Object.keys(scores).map(key => ({
    ...scores[key],
    id: key,
  }));

  const average = (scores.map(badge => badge.score).reduce((a, b) => parseInt(a) + parseInt(b)) / scores.length).toFixed(2);

  const comments = () => {
    console.log(badge.scores);

    return (
      scores.map((badge) => {
        return (
          <div className='card mt-1' key={badge.id}>
            <div className='card-body'>
              <p>
                Comment:
                {' '}
                {badge.comment}
              </p>
              <p>
                Score:
                {' '}
                {badge.score}
              </p>
              <p>
                User uid:
                {' '}
                {badge.user_uid}
              </p>
            </div>
          </div>

        );
      })
    );
  };

  return (
    <div>
      <div className='BadgeDetails__hero'>
        <div className='container'>
          <div className='row'>
            <div className='col-6' />
            <div className='col-6 BadgeDetails__hero-attendant-name'>
              <h1>
                {badge.cardName}
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Badge
              cardName={badge.cardName}
              saga={badge.saga || 'SAGA'}
              type={badge.type}
              avatarURL={badge.avatarURL}
              status={badge.status}
            />

            <h4>
              Score average:
              {' '}
              {average}
            </h4>

          </div>
          <div className='col'>
            <h2>Actions</h2>
            <div>
              <div>
                <Link
                  className='btn btn-secondary mb-4'
                  to={`/badges/${badge.id}/scores/new`}
                >
                  New Score
                </Link>
              </div>

              <div>
                <Link
                  className='btn btn-primary mb-4'
                  to={`/badges/${badge.id}/edit`}
                >
                  Edit
                </Link>
              </div>

              <div>
                <button onClick={props.onOpenModal} className='btn btn-danger'>
                  Delete
                </button>
                <DeleteBadgeModal
                  isOpen={props.modalIsOpen}
                  onClose={props.onCloseModal}
                  onDeleteBadge={props.onDeleteBadge}
                />
              </div>
            </div>
          </div>

        </div>

        <div>
          <h3>Comments</h3>
          {thereAreComments && comments()}
        </div>

      </div>
    </div>
  );
}

export default BadgeDetails;
