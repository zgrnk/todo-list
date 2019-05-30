import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createItem} from '../actions';

class NewItem extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''}`;
    const fieldType = field.label === "Description" ? "textarea" : "text";

    return(
      <div className={className}>
        <label>{field.label}</label>
        <input
          className="form-control"
          type={fieldType}
          placeholder={field.ph}
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    const {user} = this.props.profile;
    if (user._id) {
      this.props.createItem(values, () => {
        this.props.history.push('/');
      });
    } else {
      alert('You are not logged in! Please login and try again.');
      this.props.history.push('/');
    }
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <div className="text-sm-center pt50" >
          <h1>Create New Todo Item</h1>
          {/* <div className="text-sm-center pt10">
            <Link to="/">...or go Back Home</Link>
          </div> */}
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Title"
            name="title"
            ph="Make Millions"
            component={this.renderField}
          />
          <Field
            label="Description"
            name="description"
            ph="start by learning from Jake..."
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Create</button>
          <Link className="btn btn-danger" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = "Enter a title!";
  }
  if (!values.description) {
    errors.description = "What do you want to add to your todo list??";
  }

  return errors;
}

function mapStateToProps(state) {
  return {
    profile: state.profile,
  };
}

export default reduxForm({
  validate,
  form: 'CreateNewItemForm'
})(
  connect(mapStateToProps, {createItem})(NewItem)
);
