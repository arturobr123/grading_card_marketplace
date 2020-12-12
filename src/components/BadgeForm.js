import React from 'react';

class BadgeForm extends React.Component {

  render() {
    const options_types = [
      {id: 1, name: "All"},
      {id: 2, name: "Game of Thrones"},
      {id: 3, name: "Marvel"},
      {id: 4, name: "Super Smash Bros"}
     ];

     const options_statuses = [
       {id: 1, name: "Alive"},
       {id: 2, name: "Dead"},
       {id: 3, name: "Unknown"}
      ];

    return (
      <div>
        <form onSubmit={this.props.onSubmit}>

          <div className="row">
            <div className="form-group col-6">
              <label>First Name</label>
              <input required
                onChange={this.props.onChange}
                className="form-control"
                type="text"
                name="firstName"
                value={this.props.formValues.firstName}
              />
            </div>

            <div className="form-group col-6">
              <label>Last Name</label>
              <input
                onChange={this.props.onChange}
                className="form-control"
                type="text"
                name="lastName"
                value={this.props.formValues.lastName}
              />
            </div>
          </div>

          <div className="form-group">
            <label>Job Title</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="jobTitle"
              value={this.props.formValues.jobTitle}
            />
          </div>

          <div className="form-group">
            <label>{"Where is this Character from ?"}</label>

            <select name="type"
              onChange={this.props.onChange}
              value={this.props.formValues.type}
              className="form-control">
              {options_types.map(option => {
                return (
                  <option key={option.id}>{option.name}</option>
                );
              })}
            </select>
          </div>

          <div className="form-group">
            <label>Last location</label>
            <input
              onChange={this.props.onChange}
              className="form-control"
              type="text"
              name="lastLocation"
              value={this.props.formValues.lastLocation}
            />
          </div>

          <div className="form-group">
            <label>{"Status"}</label>

            <select name="status"
              onChange={this.props.onChange}
              value={this.props.formValues.status}
              className="form-control">
              {options_statuses.map(option => {
                return (
                  <option key={option.id}>{option.name}</option>
                );
              })}
            </select>
          </div>

          <input
            type="file"
            name="avatarURL"
            accept="image/*"
            onChange={this.props.onChangeImage}
          />

          <button className="btn btn-primary">
            Save
          </button>

          {this.props.error && (
            <p className="text-danger">{this.props.error.message}</p>
          )}
        </form>
      </div>
    );
  }
}

export default BadgeForm;
