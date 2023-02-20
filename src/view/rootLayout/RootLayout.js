import React, {useEffect} from 'react';
import Header from "../../layout/header/Header";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import './rootLayout.css';
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, logInUser} from "../../store/user/UserAction";
import {beClient} from "../../config/BeClient";


function RootLayout() {

  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (!user._id && !accessToken && window.location.pathname !== '/sign-up') {
      navigate("/login");
    } else if (accessToken) {
      beClient.get("/user/me")
        .then((res) => {
          const userInfo = res.data;
          dispatch(fetchUserData(userInfo));
        })
        .catch((e) => {
          console.log(e);
          navigate("/login");
        });
    }

  }, []);

  return (
    <div className="App">
      <div className='block'>
        <Header/>
      </div>
      <div className='app-body' style={{margin: '0rem 6rem'}}>
        <Outlet/>
      </div>
      <div className='block mt-6'>
        <Footer/>
      </div>
    </div>
);
}

export default RootLayout;