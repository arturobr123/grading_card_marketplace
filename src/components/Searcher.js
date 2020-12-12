import React from 'react';

import { optionsTypes } from '../actions/index' ;

function Searcher(props) {

  return (
    <div className='row'>
      <div className='form-group col-12'>
        <label>Filter by name</label>
        <input
          type='text'
          className='form-control'
          value={props.query}
          onChange={(e) => {
            props.setQuery(e.target.value);
          }}
        />
      </div>

      <div className='form-group col-12'>
        <label> What is the type of card?</label>

        <select
          name='twitter'
          className='form-control'
          id='typeSelector'
          value={props.type}
          onChange={(e) => {
            props.setType(e.target.value);
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
