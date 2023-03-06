import React, {useEffect} from 'react';
import Header from "../../layout/header/Header";
import {Outlet, useLoaderData, useNavigate} from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import './rootLayout.css';
import {useDispatch, useSelector} from "react-redux";
import {beClient} from "../../config/BeClient";
import Notification from "../notification/Notification";
import {userActions} from "../../store/UserSlice";
import socket, {createSocketConnection} from "../../config/Socket";


function RootLayout() {
  const data = useLoaderData();
  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (!user._id && !accessToken && window.location.pathname !== '/sign-up') {
      navigate("/login");
    } else if (accessToken && !user._id) {
      beClient.get("/user/me")
        .then((res) => {
          const userInfo = res.data;
          dispatch(userActions.fetchData(userInfo));
          createSocketConnection(userInfo);
        })
        .catch((e) => {
          navigate("/login");
        });
    }

    // return () => {
    //   socket.off('connect');
    //   socket.off('disconnect');
    // };
  }, []);

  return (
    <div className="App has-background-white-ter ">
      <Header/>
      {notification && <Notification/>}
      <div className='app-body has-background-white mx-auto px-3 px-2-mobile py-2' style={{width: '80%',maxWidth: '1215px'}}>
        <div className='container'>
          <Outlet/>
        </div>
      </div>
      <Footer/>
    </div>
);
}

export default RootLayout;