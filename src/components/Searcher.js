/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { optionsTypes } from '../actions/index' ;

import './styles/searcher.css';

function Searcher(props) {

  const { query, type, setType, setQuery } = props;

  return (
    <div className='row'>
      <div className='col-12 mt-3'>
        <form>
          <input
            type='text'
            className='form-control inputSearch'
            placeholder='Search cards by name...'
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </form>
      </div>

      <div className='form-group col-12'>
        <label> What is the type of card?</label>

        <select
          className='form-control inputSearch'
          id='typeSelector'
          value={type}
          onChange={(e) => {
            setType(e.target.value);
          }}
        >
          {optionsTypes.map((option) => {
            return (
              <option key={option.id}>{option.name}</option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Searcher;
