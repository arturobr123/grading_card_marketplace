/* eslint-disable react/button-has-type */
import React from 'react';

import Modal from './Modal';

function DeleteBadgeModal(props) {
  const { isOpen, onClose, onDeleteBadge } = props;
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='DeleteBadgeModal'>
        <h1>Are You Sure?</h1>
        <p>You are about to delete this badge.</p>

        <div>
          <button onClick={onDeleteBadge} className='btn btn-danger mr-4'>
            Delete
          </button>
          <button onClick={onClose} className='btn btn-primary'>
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default DeleteBadgeModal;
