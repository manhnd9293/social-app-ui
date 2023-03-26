import React, {createContext, useEffect, useState} from 'react';
import Header from "../../layout/header/Header";
import {Outlet, useNavigate, useNavigation} from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import './rootLayout.css';
import {useDispatch, useSelector} from "react-redux";
import {beClient} from "../../config/BeClient";
import Notification from "../notification/Notification";
import {userActions} from "../../store/UserSlice";
import {createSocket} from "../../config/Socket";
import Loader from "../../common/loader/Loader";

const SocketContext = createContext(null);

function RootLayout() {
  const [socket, setSocket] = useState(null);

  const user = useSelector((state) => state.user);
  const notification = useSelector((state) => state.notification)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigation = useNavigation();


  useEffect(() => {

    const accessToken = localStorage.getItem("accessToken");

    if (!user._id && !accessToken && window.location.pathname !== '/sign-up') {
      navigate("/login");
    } else if (accessToken) { //update always fetch user data and create socket connection when render root layout
      beClient.get("/user/me")
        .then((res) => {
          const userInfo = res.data;
          dispatch(userActions.fetchData(userInfo));
          setSocket(createSocket(userInfo));
        })
        .catch((e) => {
          //todo: this code may never be called
          navigate("/login");
        });
    }

  }, []);

  useEffect(() => {
    return () => {
      if (!socket) return;

      socket.off('connect');
      socket.off('disconnect');
      socket.close()
      console.log(`close socket`);
    };
  }, [socket]);


  return (
    <SocketContext.Provider value={socket}>
      <div className="App has-background-white-ter">
        <Header/>
        {notification && <Notification/>}
        {process.env.REACT_APP_NODE_ENV !== 'development' && <Loader active={navigation.state === 'loading'}/>}
        <div className='app-body mx-auto px-3 px-2-mobile py-2 has-background-white'
             style={{width: '80%', maxWidth: '1215px', height: '100%'}}>
          <div className='container'>
            <Outlet/>
          </div>
        </div>
        <Footer/>
      </div>
    </SocketContext.Provider>
  );
}

export {SocketContext}

export default RootLayout;