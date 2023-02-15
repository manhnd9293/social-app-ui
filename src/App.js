import './App.css';
import 'bulma/css/bulma.css'
import {RouterProvider} from "react-router-dom";
import router from "./route/router";
import React from "react";

function App() {
  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  );
}

export default App;
