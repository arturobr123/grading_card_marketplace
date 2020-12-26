/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
/* eslint-disable react/button-has-type */
import React from 'react';

import { optionStatuses, optionsTypes, optionGradeCompany } from '../actions/index' ;

class BadgeForm extends React.Component {

  render() {
    const { onSubmit, onChange, formValues, error, onChangeImage } = this.props;

    return (
      <div>
        <form onSubmit={onSubmit}>

          <div className='row'>
            <div className='form-group col-6'>
              <label>Card Name</label>
              <input
                required
                onChange={onChange}
                className='form-control'
                type='text'
                name='cardName'
                value={formValues.cardName}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>Saga</label>
            <input
              onChange={onChange}
              className='form-control'
              type='text'
              name='saga'
              value={formValues.saga}
            />
          </div>

          <div className='form-group'>
            <label>Type? Rare? Secret rare?</label>

            <select
              name='type'
              onChange={onChange}
              value={formValues.type}
              className='form-control'
            >
              {optionsTypes.map((option) => {
                return (
                  <option key={option.id}>{option.name}</option>
                );
              })}
            </select>
          </div>

          <div className='row'>
            <div className='form-group col-6'>
              <label>Grade Company</label>
              <select
                name='gradeCompany'
                onChange={onChange}
                value={formValues.gradeCompany}
                className='form-control'
              >
                {optionGradeCompany.map((option) => {
                  return (
                    <option key={option.id}>{option.name}</option>
                  );
                })}
              </select>
            </div>

            <div className='form-group col-6'>
              <label>Grade</label>
              <input
                onChange={onChange}
                className='form-control'
                type='number'
                name='grade'
                value={formValues.grade}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>Price</label>
            <input
              onChange={onChange}
              className='form-control'
              type='number'
              name='price'
              value={formValues.price}
            />
          </div>

          <div className='form-group'>
            <label>Status</label>

            <select
              name='status'
              onChange={onChange}
              value={formValues.status}
              className='form-control'
            >
              {optionStatuses.map((option) => {
                return (
                  <option key={option.id}>{option.name}</option>
                );
              })}
            </select>
          </div>

          <input
            type='file'
            name='avatarURL'
            accept='image/*'
            onChange={onChangeImage}
          />

          <button className='btn btn-primary'>
            Save
          </button>

          {error && (
            <p className='text-danger'>{error.message}</p>
          )}
        </form>

        <br />
        <br />
        <br />
      </div>
    );
  }
}

export default BadgeForm;
