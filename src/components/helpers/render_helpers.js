import React from'react';

export function renderField(field) {  
  const { meta } = field;
  //to destructure further you could do:
  // const { meta: { touched, error }} = field; and remove remove references
  //to meta from the function
  const className = `form-group ${meta.touched && meta.error ? 'has-danger' : ''}`

  return (

    <div className={className}>
    {/* the ...field.input below wires up the event  handlers for the
      input (onChange, etc.) for redux-form so we don't have to do it manually
      for each one we might need
     */}
      <label>{field.label}</label>
      <input
        className="form-control"
        type={field.inputType}
        {...field.input}
      />
      {/*The meta.error and meta.touched below are autmotically added to
        the field object from the validate() function. The touched
        property means the field has had focus and then lost focus */}
      <div className="text-help">
        {meta.touched ? meta.error : ''}
      </div>
    </div>
  );
}

export function renderAlert(props) {
    if (props.errorMessage){
      return (
        <div className="alert alert-danger" role="alert">
          <strong>Oops! </strong>{props.errorMessage}
        </div>
      )
    }
}
