import {useForm} from "react-hook-form";
import {beClient} from "../../config/BeClient";
import {useDispatch} from "react-redux";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {userActions} from "../../store/UserSlice";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {state} = useLocation();

  let defaultValues = {
    username: state?.username || '',
    password: state?.password || '',
  };
  const {register, formState: {errors}, handleSubmit, reset}= useForm({mode: "all",
    defaultValues})



  const onSubmit=(data) => {
    beClient.post('/user/sign-in', {
      username: data.username,
      password: data.password
    }).then(res => {
      dispatch(userActions.login(res.data));
      navigate('/');
    })
  }

  const validateName = (value)=> {;
    return  value.length > 0 || 'name is required'
  }

  return (
    <div>
      <div className='box' style={{maxWidth: '30rem'}}>
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
          <div className="field">
            <div className="control">
              <button className="button is-info">
                Sign In
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
        <div>
          <span>Don't have an account ? <Link to={'/sign-up'}>Sign up</Link></span>
        </div>

      </div>
    </div>
  );
}

export default Login;