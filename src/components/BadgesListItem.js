import React from 'react';
import { Link } from 'react-router-dom';

class BadgesListItem extends React.Component {
  render() {
    const { badge } = this.props;
    return (
      <div className='all-isotope-item col-md-3 col-sm-12'>
        <div className='thumb'>
          <a className='gallery-fancybox' href='/'>
            <img style={{ height: '24rem' }} variant='top' src={badge.avatarURL} alt='avatar' />
          </a>
          <a className='btn btn-white' href='/'>Live Preview</a>
        </div>
        <div className='item-details'>
          <span className='price'>
            $
            {badge.price}
          </span>
          <span className='ratting float-right'>
            <i className='fa fa-star' />
            <i className='fa fa-star' />
            <i className='fa fa-star' />
            <i className='fa fa-star' />
            <i className='fa fa-star star-o' />
            <span>(12)</span>
          </span>
          <h4><Link to={`/badges/${badge.id}`}>{badge.cardName}</Link></h4>
          <p>
            <b>Grade Company:</b>
            {' '}
            {badge.gradeCompany}
          </p>
          <p>
            <b>Grade:</b>
            {badge.grade}
          </p>
          <p>
            Price:
            {' '}
            $
            {badge.price}
          </p>

          Info:
          {' '}
          {badge.saga}
        </div>
      </div>
    );
  }
}

export default BadgesListItem;
