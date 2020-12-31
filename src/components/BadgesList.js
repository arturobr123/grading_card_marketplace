import React from 'react';
import { Link } from 'react-router-dom';
import UserSearchBadges from './userSearchBadges';
import BadgesListItem from './BadgesListItem';
import Searcher from './Searcher';

function BadgesList(props) {
  const { badges } = props;
  const { query, setQuery, type, setType, filteredBadges } = UserSearchBadges(badges);

  if (filteredBadges.length === 0) {
    return (
      <div>
        <Searcher query={query} setQuery={setQuery} type={type} setType={setType} />

        <h3>No cards were found, may be you can help us creating the card than you were serching</h3>
        <Link className='btn btn-primary' to='/badges/new'>
          Create new card
        </Link>
      </div>
    );
  }

  return (
    <div>

      <Searcher query={query} setQuery={setQuery} type={type} setType={setType} />

      <section className='all-item-area pd-bottom-100'>
        <div className=''>
          <div className='row'>
            <div className='col-lg-4'>
              <div className='section-title'>
                <h2>All Items</h2>
              </div>
            </div>
            <div className='col-lg-8 mt-2'>
              <div className='isotope-filters item-isotope-btn text-lg-right'>
                <button type='button' className='button active ml-0' data-filter='*'>All Items</button>
                <button type='button' className='button' data-filter='.cat-1'>Secret Rare</button>
                <button type='button' className='button' data-filter='.cat-2'>Ultra Rare</button>
                <button type='button' className='button' data-filter='.cat-3'>Rainbow Rare</button>
              </div>
            </div>
          </div>
          <div className='all-item-section'>
            <div className='item-isotope row'>
              {/* gallery item start here */}
              {filteredBadges.map((badge) => {
                return (
                  <BadgesListItem badge={badge} />
                );
              })}
            </div>
          </div>
          <div className='row'>
            <div className='col-lg-12 text-center'>
              <Link className='btn btn-base' to='/product'>More Products</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BadgesList;
