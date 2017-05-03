import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { renderField, renderAlert } from '../helpers/render_helpers';

class Signin extends Component {

  handleFormSubmit(values){
    this.props.signinUser({ email: values.email, password: values.password });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <Field
          label="Email"
          name="email"
          inputType="text"
          component={renderField}
        />
        <Field
          label="Password"
          name="password"
          inputType="password"
          component={renderField}
        />
      {renderAlert(this.props)}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }
}

function validate(values){
  // (ex) values equals an object with form values - {title: 'New Post', categories: 'camping, boating', content: 'this is my new post content'}
  // The erros object returned is automatically add to the meta.errors of the field object
  // in renderfield(field)
  //The properties in the errors object MUST MATCH the 'name' attribute in the <Field> component
  const errors = {};

  //Validate the inputs from 'values' object
  if (!values.email){
    errors.email = "Please enter an email address";
  }

  if (!values.password){
    errors.password = "Please enter a password";
  }

  //If errors is empty, redux-form assumes the form is valid and ok to submit.
  //otherwise, it assumes validation failed.
  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default reduxForm({
  validate: validate,
  form: 'signin'
})(
  connect(mapStateToProps, actions)(Signin)
);
