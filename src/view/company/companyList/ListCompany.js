import React from 'react';
import {Link} from "react-router-dom";

function ListCompany(props) {
  return (
    <div>
      <div className='subtitle'>List Company</div>
      <div className='mt-3'>
        <Link to='new'>
          <div className='button is-info'>Add new</div>
        </Link>
      </div>
    </div>
  );
}

export default ListCompany;