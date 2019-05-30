import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {login} from '../actions';

class Login extends Component {
  renderField(field) {
    const {meta: {touched, error}} = field;
    const className = `form-group ${touched && error ? 'has-danger' : ''} add-top-padding`;
    const fieldType = field.label === "Password" ? "password" : "text";

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
    this.props.login(values, () => this.props.history.push('/'));
  }

  render() {
    const {handleSubmit} = this.props;

    return (
      <div>
        <div className="text-sm-center pt50">
          <h1>Welcome Back!</h1>
          <div className="text-sm-center pt10">
            <Link to="/user/signup">...dont have account?</Link>
          </div>
        </div>
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field
            label="Username"
            name="username"
            component={this.renderField}
          />
          <Field
            label="Password"
            name="password"
            component={this.renderField}
          />
          <button type="submit" className="btn btn-primary">Login</button>
          <Link className="btn btn-danger" to="/">Cancel</Link>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.username) {
    errors.title = "Enter a username!";
  }
  if (!values.password) {
    errors.categories = "Enter a password!";
  }
  return errors;
}

export default reduxForm({
  validate,
  form: 'LoginForm'
})(
  connect(null, {login})(Login)
);
