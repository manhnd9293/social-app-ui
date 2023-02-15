import React, { useState} from 'react';
import {useForm} from "react-hook-form";
let defaultValues = {
  name: '',
  email: ''
};

function Register() {

  const {register, formState: {errors}, handleSubmit, reset, clearErrors}= useForm({mode: "all",
    defaultValues})
  const onSubmit=(data) => {
    console.log(data)
  }

  const validateName = (value)=> {;
    return  value.length > 0 || 'name is required'
  }

  return (
    <div>
      <div className='box' style={{maxWidth: '30rem'}}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Name</label>
            <div className="control">
              <input className={`input ${errors.name ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Name"
                     {...register('name', {
                        validate: validateName
                       },
                     )}
              />
            </div>
            {errors.name && <p className='help is-danger' >{errors.name.message}</p>}
          </div>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input className={`input ${errors.email ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="email"
                     {...register('email', {
                         maxLength: {
                           value: 3,
                           message: 'Max length for this is 3'
                         },
                         required: 'Email is required'
                       },
                     )}
              />
            </div>
            {errors.email && <p className='help is-danger' >{errors.email.message}</p>}
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-info">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3">
          <button className="button is-primary" onClick={() => {
            // clearErrors()
            reset({
              ...defaultValues
            }, {
              keepErrors: false,
              keepDirty: false,
              keepTouched: false,
              keepIsSubmitted: false,
            });
          }}>
            Reset
          </button>
        </div>

      </div>
    </div>
  );
}

export default Register;