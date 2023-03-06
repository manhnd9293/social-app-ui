import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import {Link, useNavigate} from "react-router-dom";
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";

let defaultValues = {
  username: '',
  password: '',
  confirmPassword: '',
  fullName: ''
};
const backgroundUrl = 'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Berchtesgaden_Desktop_1920x1080.jpg'



function Register() {

  const {register, formState: {errors}, handleSubmit, reset, getValues}= useForm({mode: "all",
    defaultValues})
  const [signUpError, setSignUpError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    document.getElementById('app-body').classList.remove('has-navbar-fixed-top')
    return () => {
      document.getElementById('app-body').classList.add('has-navbar-fixed-top')
    }
  },[])

  const onSubmit=(data) => {
    beClient.post('/user/sign-up', {
      ...data
    }).then((res) => {
      alert('Sign up successfully');
      const {username, password} = data;
      navigate('/login', {state: {username, password}});
    }).catch(e => {
      setSignUpError(e);
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
    const {data: {exist}} = await beClient.get(`/user/check-username-exist?username=${value}`).catch(e => setSignUpError(e));
    if (exist) {
      return 'username existed';
    }

  }



  return (
    <div style={utils.getBackgroundImageStyle(backgroundUrl)}>
      <div className='is-invisible'>Sometext</div>
      <div className='box mx-auto mt-6' style={{maxWidth: '30rem'}}>
        <div className='container has-text-centered title is-size-4'>Sign Up</div>
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
            <label className="label">Username</label>
            <div className="control">
              <input className={`input ${errors.username ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Username"
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
          {signUpError && <p className='help is-danger' >{utils.getErrorMessage(signUpError)}</p>}

          <div className="field mt-4">
            <div className="control container has-text-centered">
              <button className="button is-info">
                Sign Up
              </button>
            </div>
          </div>
        </form>

        <div className="mt-3 container has-text-centered">
          <button className="button is-small is-primary" onClick={() => {
            // clearErrors()
            reset({
              ...defaultValues
            }, {
              keepErrors: false,
              keepDirty: false,
              keepTouched: false,
              keepIsSubmitted: false,
            });
            setSignUpError(null);
          }}>
            Reset
          </button>
        </div>
        <div className='container has-text-centered mt-4'>
          <span>Already have an account ? <Link to={'/login'}>Sign In</Link></span>
        </div>
      </div>
    </div>
  );
}

export default Register;