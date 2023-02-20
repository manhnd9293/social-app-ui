import React, { useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {beClient} from "../../config/BeClient";
let defaultValues = {
  username: '',
  password: '',
  confirmPassword: '',
  fullName: ''
};

function Register() {

  const {register, formState: {errors}, handleSubmit, reset, getValues}= useForm({mode: "all",
    defaultValues})
  const navigate = useNavigate();

  const onSubmit=(data) => {
    console.log(data);
    beClient.post('/user/sign-up', {
      ...data
    }).then((res) => {
      alert('Sign up successfully');
      const {username, password} = data;
      navigate('/login', {state: {username, password}});
    })
  }

  const validateFullName = (value)=> {;
    return  value.length > 0 || 'Full name is required'
  }

  const validateConfirmPassword = (value) => {
    if(value !== getValues().password) {
      return 'Confirm password not match'
    }
  }

  const validateUsername = async (value) => {
    if(value.indexOf(' ') !== -1) {
      return 'username must not have white space';
    }
    const {data: {exist}} = await beClient.get(`/user/check-username-exist?username=${value}`);
    if (exist) {
      return 'username existed';
    }

  }

  return (
    <div>
      <div className='box' style={{maxWidth: '30rem'}}>
        <Link to='/login'>
          <button className='button is-info mb-3'>
            <i className='fas fa-arrow-left'/>
            <span className='ml-3'>Back to login</span>
          </button>
        </Link>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Full Name</label>
            <div className="control">
              <input className={`input ${errors.fullName ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Full Name"
                     {...register('fullName', {
                        validate: validateFullName
                       },
                     )}
              />
            </div>
            {errors.fullName && <p className='help is-danger' >{errors.fullName.message}</p>}
          </div>
          <div className="field">
            <label className="label">User Name</label>
            <div className="control">
              <input className={`input ${errors.username ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="User Name"
                     {...register('username', {

                          required: 'Username is required',
                          validate: validateUsername
                       },
                     )}
              />
            </div>
            {errors.username && <p className='help is-danger' >{errors.username.message}</p>}
          </div>
          <div className="field">
            <label className="label">Password</label>
            <div className="control">
              <input className={`input ${errors.password ? 'is-danger' : ''}`}
                     type="password"
                     placeholder="Password"
                     {...register('password', {

                         required: 'Password is required'
                       },
                     )}
              />
            </div>
            {errors.password && <p className='help is-danger' >{errors.password.message}</p>}
          </div>
          <div className="field">
            <label className="label">Confirm password</label>
            <div className="control">
              <input className={`input ${errors.confirmPassword ? 'is-danger' : ''}`}
                     type="password"
                     placeholder="Confirm password"
                     {...register('confirmPassword', {
                         required: 'Confirm Password is required',
                       validate: {
                           validateConfirmPassword
                       }
                       },
                     )}
              />
            </div>
            {errors.confirmPassword && <p className='help is-danger' >{errors.confirmPassword.message}</p>}
          </div>
          <div className="field">
            <div className="control">
              <button className="button is-primary">
                Submit
              </button>
            </div>
          </div>
        </form>
        <div className="mt-3">
          <button className="button" onClick={() => {
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