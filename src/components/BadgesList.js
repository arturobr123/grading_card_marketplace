import React from 'react';
import { Link } from 'react-router-dom';
import Gravatar from './Gravatar';
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

        <h3>No characters were found, may be you can help us creating the character than you were serching</h3>
        <Link className='btn btn-primary' to='/badges/new'>
          Create new character
        </Link>
      </div>
    );
  }

  return (
    <div className='BadgesList'>

      <Searcher query={query} setQuery={setQuery} type={type} setType={setType} />

      <ul className='list-unstyled row'>
        {filteredBadges.map((badge) => {
          return (
            <li key={badge.id} className='col-md-3 col-sm-12'>
              <Link
                className='text-reset text-decoration-none'
                to={`/badges/${badge.id}`}
              >
                <BadgesListItem badge={badge} />
              </Link>
            </li>
          );
        })}
      </ul>

    </div>
  );
}

export default BadgesList;
