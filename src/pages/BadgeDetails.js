import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgeDetails.css';
import Badge from '../components/Badge';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

function BadgeDetails(props) {
  const { badge } = props;

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

      </div>
    </div>
  );
}

export default BadgeDetails;
