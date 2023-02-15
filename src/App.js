import './App.css';
import 'bulma/css/bulma.css'
import Header from "./layout/header/Header";
import Footer from "./layout/footer/Footer";
import {RouterProvider} from "react-router-dom";
import router from "./route/router";
import React from "react";

function App() {

  return (
    <div className="App">
      <div className='block'>
        <Header/>
      </div>
      <div className='app-body' style={{margin: '0rem 6rem'}}>
        <RouterProvider router={router}/>
      </div>
      <div className='block mt-6'>
        <Footer/>
      </div>
    </div>
  );
}

export default App;
