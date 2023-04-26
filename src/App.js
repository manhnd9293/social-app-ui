import './App.css';
import 'bulma/css/bulma.css'
import 'bulma-list/css/bulma-list.css'
import {RouterProvider} from "react-router-dom";
import router from "./route/router";
import React, {useEffect} from "react";
import {useDispatch} from "react-redux";
import {navDropDownActions} from "./store/NavDropSlice";
import 'bulma-switch';


function App() {
  const dispatch = useDispatch();

  function appClick() {
    dispatch(navDropDownActions.hideDropdown())
  }

  useEffect(() => {
    console.log("%cStop!", "color:red;font-size:50px;font-weight:bold");
    console.log('This is a browser feature intended for developers. If someone told you to copy-paste something here to enable a feature or "hack" someone\'s account, it is a scam and will give them access to your Huni account.');
  }, [])

  return (
    <div onClick={appClick}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
