import React from 'react';

import { optionStatuses, optionsTypes } from '../actions/index' ;

class BadgeForm extends React.Component {

  render() {
    return (
      <div>
        <form onSubmit={this.props.onSubmit}>

          <div className='row'>
            <div className='form-group col-6'>
              <label>Card Name</label>
              <input
                required
                onChange={this.props.onChange}
                className='form-control'
                type='text'
                name='cardName'
                value={this.props.formValues.cardName}
              />
            </div>
          </div>

          <div className='form-group'>
            <label>Saga</label>
            <input
              onChange={this.props.onChange}
              className='form-control'
              type='text'
              name='saga'
              value={this.props.formValues.saga}
            />
          </div>

          <div className='form-group'>
            <label>Type? Rare? Secret rare?</label>

            <select
              name='type'
              onChange={this.props.onChange}
              value={this.props.formValues.type}
              className='form-control'
            >
              {optionsTypes.map((option) => {
                return (
                  <option key={option.id}>{option.name}</option>
                );
              })}
            </select>
          </div>

          <div className='form-group'>
            <label>Status</label>

            <select
              name='status'
              onChange={this.props.onChange}
              value={this.props.formValues.status}
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
            onChange={this.props.onChangeImage}
          />

          <button className='btn btn-primary'>
            Save
          </button>

          {this.props.error && (
            <p className='text-danger'>{this.props.error.message}</p>
          )}
        </form>
      </div>
    );
  }
}

export default BadgeForm;
