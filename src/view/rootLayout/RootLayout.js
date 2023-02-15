import React from 'react';
import Header from "../../layout/header/Header";
import {Outlet, RouterProvider} from "react-router-dom";
import Footer from "../../layout/footer/Footer";
import './rootLayout.css';

function RootLayout() {


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