import React from 'react';
import utils from "../../../utils/utils";
import {Link} from "react-router-dom";

function FilterBar({industries, provinces}) {
  return (
    <div>
      <div className='columns'>
        <div className='column is-3 '>
          <input className="input " type="text" placeholder="Search"/>
        </div>

        <div className='column is-2 '>
          <div className='select is-fullwidth'>
            <select>
              <option>Select industry</option>
              {
                industries.map((industry, index) => (
                  <option key={index} value={industry}>{industry[0].toUpperCase() + industry.slice(1)}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='column is-2'>
          <div className='select is-fullwidth'>
            <select>
              <option>Select city</option>
              {
                provinces.map((province, index) => (
                  <option key={index} value={province}>{utils.upperCaseFirst(province)}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='column is-1'>
          <div className='button is-info'>
            Filter
          </div>
        </div>

        <div className='column is-1'>
          <Link to='new'>
            <div className='button is-link'>Add new</div>
          </Link>
        </div>

      </div>
    </div>
  );
}

export default FilterBar;