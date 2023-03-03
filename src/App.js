import './App.css';
import 'bulma/css/bulma.css'
import {RouterProvider} from "react-router-dom";
import router from "./route/router";
import React from "react";
import {useSelector} from "react-redux";


function App() {
  const topLevelClickEventHandlers = useSelector(state => state.topLevelClickEventHandlers);

  function handleTopLevelClick() {
    for (let handler of topLevelClickEventHandlers) {
      handler();
    }
  }

  return (
    <div onClick={handleTopLevelClick}>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
