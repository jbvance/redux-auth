import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Field, reduxForm } from 'redux-form';
import * as actions from '../../actions';
import { renderField, renderAlert } from '../helpers/render_helpers';

class Signup extends Component {

  handleFormSubmit(values){
    this.props.signinUser({ email: values.email, password: values.password });
  }

  handleFormSubmit(formProps){
    //Call action creator to sign up the user
    this.props.signupUser(formProps);
  }


  render() {
    //TODO refactor input fields into a function to prevent repeating same code three times
    const  { handleSubmit } = this.props;
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

        <Field
          label="Confirm Password"
          name="passwordConfirm"
          inputType="password"
          component={renderField}
        />

      { renderAlert(this.props) }
        <button action="submit" className="btn btn-primary">Sign Up </button>
      </form>
    );
  }
}

function validate(formProps) {
  const errors = {};

  if (!formProps.email){
    errors.email = 'Please enter an email';
  }

  if (!formProps.password){
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if (formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }
 
  return errors;
}

function mapStateToProps(state){
  return { errorMessage: state.auth.error}
}

export default reduxForm({
  validate: validate,
  form: 'signup'
})(
  connect(mapStateToProps, actions)(Signup)
);
