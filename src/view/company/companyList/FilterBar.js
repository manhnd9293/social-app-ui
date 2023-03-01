import React, {useState} from 'react';
import utils from "../../../utils/utils";
import {Link, useNavigate} from "react-router-dom";
const industries = ['it', 'car', 'beauty', 'agriculture', 'service', 'tourist']
const provinces = ['Hanoi', "HoChiMinh city", "Danang", 'Other'];

function FilterBar({onSubmit}) {
  const {
    province: initProvince,
    search: initSearch,
    industry: initIndustry
  } = utils.getUrlQueryParams(['page', 'search', 'industry', 'province'])

  const [search, setSearch] = useState(initSearch || '');
  const [industry, setIndustry] = useState(initIndustry || '');
  const [province, setProvince] = useState(initProvince || '');
  const navigate = useNavigate();
  function filter() {
    const queryObject = {
      search,
      industry,
      province,
      page: 1
    }
    navigate(`/company${utils.createQueryString(queryObject)}`);
  }

  function handePressEnter(e) {
    if (e.key === 'Enter') {
      filter();
    }
  }

  return (
    <div>
      <div className='columns'>
        <div className='column is-3 '>
          <input className="input "
                 type="text"
                 placeholder="Search"
                 value={search}
                 onChange={event => setSearch(event.target.value)}
                 onKeyUp={handePressEnter}
          />
        </div>

        <div className='column is-2 '>
          <div className='select is-fullwidth'>
            <select value={industry} onChange={(e) => setIndustry(e.target.value)}>
              <option value={''}>All industry</option>
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
            <select value={province} onChange={event => setProvince(event.target.value)}>
              <option value=''>All city</option>
              {
                provinces.map((province, index) => (
                  <option key={index} value={province}>{utils.upperCaseFirst(province)}</option>
                ))
              }
            </select>
          </div>
        </div>

        <div className='column is-1'>
          <div className='button is-info'
               onClick={filter}
          >
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