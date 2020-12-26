/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';

import { optionsTypes } from '../actions/index' ;

function Searcher(props) {

  const { query, type, setType, setQuery } = props;

  return (
    <div className='row'>
      <div className='form-group col-12'>
        <label>Filter by name</label>
        <input
          type='text'
          className='form-control'
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
      </div>

      <div className='form-group col-12'>
        <label> What is the type of card?</label>

        <select
          name='twitter'
          className='form-control'
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
