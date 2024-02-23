import {useForm} from "react-hook-form";
import {beClient} from "../../config/BeClient";
import {useDispatch} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {userActions} from "../../store/UserSlice";
import {useEffect, useState} from "react";
import utils from "../../utils/utils";
import classes from './login.module.scss';
import background from './back.jpg';

const loginBackgroundUrl = 'https://wallpapers.com/wallpapers/blue-gradient-connect-dots-922uvtyggntr1kxm.html'
function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();
  const [loginError, setLoginError] = useState(null);

  let defaultValues = {
    username: state?.username || '',
    password: state?.password || '',
  };
  const {register, formState: {errors}, handleSubmit, reset}= useForm({mode: "all",
    defaultValues})

  useEffect(() => {
    document.getElementById('app-body').classList.remove('has-navbar-fixed-top')
    return () => {
      document.getElementById('app-body').classList.add('has-navbar-fixed-top')
    }
  },[])


  const onSubmit=(data) => {
    beClient.post('/user/sign-in', {
      username: data.username,
      password: data.password
    }).then(res => {
      const user = res.data;
      dispatch(userActions.login(user));
      // createSocket(user);
      navigate('/');
    }).catch(e => {
      setLoginError(e);
    })
  }

  const validateName = (value)=> {;
    return  value.length > 0 || 'name is required'
  }

  return (
    <div className='' style={utils.getBackgroundImageStyle(background)}>
      {/*<div className='is-invisible'>hack</div>*/}
      <div className={`box ${classes.loginBox}`} >
        <div className='container has-text-centered mb-4'>
          <span className='title is-size-4'>Sign In</span>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="field">
            <label className="label">Username</label>
            <div className="control">
              <input className={`input ${errors.username ? 'is-danger' : ''}`}
                     type="text"
                     placeholder="Username"
                     {...register('username', {
                         validate: validateName
                       },
                     )}
              />
            </div>
            <p className={`help is-danger ${!errors.username ? 'is-invisible': ''}`} >{errors.username?.message || 'hack'}</p>
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
            <p className={`help is-danger ${!errors.password ? 'is-invisible': ''}`} >{errors.password?.message || 'hack'}</p>
          </div>
          <p className={`help has-text-centered is-danger is-size-6 ${!loginError ? 'is-invisible': ''}`}>{utils.getErrorMessage(loginError) || 'hack'}</p>
          <div className="field mt-3">
            <div className="control container has-text-centered">
              <button className="button is-link is-rounded">
                <strong>Sign in</strong>
              </button>
            </div>
          </div>
        </form>
        <div className='container has-text-centered mt-6'>

          {/*<div className="mt-3">
            <button className="button is-primary is-small" onClick={() => {
              // clearErrors()
              reset({
                ...defaultValues
              }, {
                keepErrors: false,
                keepDirty: false,
                keepTouched: false,
                keepIsSubmitted: false,
              });
              setLoginError(null);
            }}>
              Reset
            </button>
          </div>*/}
          <div className='mt-4'>Don't have an account ? <Link to={'/sign-up'}>Sign up</Link></div>
        </div>
      </div>
    </div>
  );
}



export default Login;