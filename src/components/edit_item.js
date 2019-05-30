import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {editItem} from '../actions';

class EditItem extends Component {
  componentWillMount () {
    const {item} = this.props;
    if (!item) {
      alert('could not find this item! try another one :)');
      this.props.history.push('/');
    } else {
      this.props.initialize({
        title: item.title,
        description: item.description,
      });
    }
  }

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
          {...field.input}
        />
        <div className="text-help">
          {touched ? error : ''}
        </div>
      </div>
    );
  }

  onSubmit(values) {
    const {user, item} = this.props.profile;
    console.log('item', item);
    if (user._id) {
      this.props.editItem(values, this.props.match.params.id, () => {
        this.props.history.push('/');
      });
    } else {
      alert('You are not logged in! Please login and try again.');
      this.props.history.push('/');
    }
  }

  render() {
    const {handleSubmit, item} = this.props;

    return (
      <div>
        <div className="text-sm-center pt50" >
          <h1>What changes do you want to make?</h1>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="New Title"
            name="title"
            component={this.renderField}
          />
          <Field
            label="New Description"
            name="description"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Edit</button>
          <Link className="btn btn-danger" onClick={()=> this.props.history.goBack()}to="#">Cancel</Link>
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

function mapStateToProps(state, ownProps) {
  return {
    profile: state.profile,
    item: state.items[ownProps.match.params.id],
  };
}

export default reduxForm({
  validate,
  form: 'EditItemForm'
})(
  connect(mapStateToProps, {editItem})(EditItem)
);
