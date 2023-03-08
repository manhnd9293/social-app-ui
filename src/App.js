import './App.css';
import 'bulma/css/bulma.css'
import 'bulma-list/css/bulma-list.css'
import {RouterProvider} from "react-router-dom";
import router from "./route/router";
import React from "react";
import {useDispatch} from "react-redux";
import {navDropDownActions} from "./store/NavDropSlice";


function App() {
  const dispatch = useDispatch();

  function appClick() {
    dispatch(navDropDownActions.hideDropdown())
  }

  return (
    <div onClick={appClick}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
