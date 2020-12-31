/* eslint-disable react/button-has-type */
import React from 'react';
import { Link } from 'react-router-dom';

import './styles/BadgeDetails.css';
import Badge from '../components/Badge';
import PageHeader from '../components/pageHeader';
import DeleteBadgeModal from '../components/DeleteBadgeModal';

function BadgeDetails(props) {
  const { badge, onOpenModal, modalIsOpen, onCloseModal, onDeleteBadge } = props;

  console.log(badge);

  return (
    <div>
      <PageHeader headertitle='Products Details' subheader='pages' />

      <div className='container'>
        <div className='row'>
          <div className='col'>
            <Badge
              cardName={badge.cardName}
              saga={badge.saga || 'SAGA'}
              type={badge.type}
              avatarURL={badge.avatarURL}
              status={badge.status}
              gradeCompany={badge.gradeCompany}
              grade={badge.grade}
              price={badge.price}
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
                <button onClick={onOpenModal} className='btn btn-danger'>
                  Delete
                </button>
                <DeleteBadgeModal
                  isOpen={modalIsOpen}
                  onClose={onCloseModal}
                  onDeleteBadge={onDeleteBadge}
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
