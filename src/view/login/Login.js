import {useForm} from "react-hook-form";
import {beClient} from "../../config/BeClient";
import {useDispatch} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {userActions} from "../../store/UserSlice";
import {useEffect, useState} from "react";
import utils from "../../utils/utils";
import {createSocket} from "../../config/Socket";

const loginBackgroundUrl = 'https://marmotamaps.com/de/fx/wallpaper/download/faszinationen/Marmotamaps_Wallpaper_Inntal_Desktop_1920x1080.jpg'

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
    <div className='' style={utils.getBackgroundImageStyle(loginBackgroundUrl)}>
      <div className='is-invisible'>hack</div>
      <div className='box mx-auto mt-6 mx-6' style={{maxWidth: '30rem'}}>
        <div className='container has-text-centered mb-4'>
          <span className='title is-size-4'>Login</span>
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
          {loginError && <p className='help is-danger is-size-6'>{utils.getErrorMessage(loginError)}</p>}
          <div className="field mt-3">
            <div className="control container has-text-centered">
              <button className="button is-info">
                Sign In
              </button>
            </div>
          </div>
        </form>
        <div className='container has-text-centered'>

          <div className="mt-3">
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
          </div>
          <div className='mt-4'>Don't have an account ? <Link to={'/sign-up'}>Sign up</Link></div>
        </div>
      </div>
    </div>
  );
}



export default Login;