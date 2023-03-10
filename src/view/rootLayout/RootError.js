import React from 'react';
import {Link} from "react-router-dom";
import Footer from "../../layout/footer/Footer";

function RootError() {
  return (
    <div className={'App'}>
      <div className='has-background-info navbar is-fixed-top'>
        <nav className="navbar is-large mx-auto is-info" role="navigation" aria-label="main navigation"
             style={{width: '80%', maxWidth: '1215px'}}>
          <div className="navbar-brand">
            <Link className="navbar-item" to="/">
              <span className='has-text-weight-bold'>H U N I</span>
            </Link>
          </div>
        </nav>
      </div>
      <div className={'app-body mt-6 mx-auto has-background-white'} style={{width: "80%" ,maxWidth: '1215px'}}>
        <div className={'title has-text-centered'}>Oops, Sorry ! Something went wrong ! Please try again later</div>
      </div>
      <Footer/>
    </div>
  );
}

export default RootError;