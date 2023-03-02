import React, {useEffect} from 'react';
import Header from "../../layout/header/Header";
import {Outlet, useNavigate} from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import './rootLayout.css';
import {useDispatch, useSelector} from "react-redux";
import {beClient} from "../../config/BeClient";
import Notification from "../notification/Notification";
import {userActions} from "../../store/UserSlice";


function RootLayout() {

  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification)
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
          dispatch(userActions.fetchData(userInfo));
        })
        .catch((e) => {
          navigate("/login");
        });
    }

  }, []);

  return (
    <div className="App has-background-white-ter ">
      <Header/>
      {notification && <Notification/>}
      <div className='app-body has-background-white mx-auto px-5-tablet px-2-mobile py-2' style={{width: '86%',maxWidth: '1320px'}}>
        <div className='container'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
);
}

function loadUserData() {

}

export default RootLayout;