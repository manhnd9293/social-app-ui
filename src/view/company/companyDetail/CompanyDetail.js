import React, {useState} from 'react';
import utils from "../../../utils/utils";
import AboutTab from "./tabs/AboutTab";
import JobTab from "./tabs/JobTab";
import PeopleTab from "./tabs/PeopleTab";
import {beClient} from "../../../config/BeClient";
import {useLoaderData} from "react-router-dom";

function TabView({name, company}) {
  switch (name) {
    case 'about':
      return <AboutTab company={company}/>
    case 'jobs':
      return <JobTab/>
    case 'people':
      return <PeopleTab/>
  }
}


function CompanyDetail() {

  const tabs = ['about', 'jobs', 'people'];
  const {tab: initialTab} = utils.getUrlQueryParams('tab');
  const [currentTab, setCurrentTab] = useState(initialTab || 'about')
  const company = useLoaderData();
  const changeTab = (tabName) => () => {
    utils.setUrlParams('tab', tabName);
    setCurrentTab(tabName)
  }

  return (
    <div>
        <figure className="image is-96x96 mt-4">
          <img src={company.logo || process.env.REACT_APP_DEFAULT_COMPANY_LOGO}/>
        </figure>

        <div className='title is-4 mt-3'>{company.name}</div>
      <div className='tabs is-boxed'>
        <ul>
          {tabs.map((tab, index) => (
            <li key={index}
                className={`${tab === currentTab ? `is-active` : ''}`}
                onClick={changeTab(tab)}
            >
              <a>
                <span>{tab[0].toUpperCase()+tab.slice(1)}</span>
              </a>
            </li>
          ))}

        </ul>
      </div>
        <TabView name={currentTab} company={company}/>

    </div>
  );
}

function loadCompanyDetail({params}) {
  const {id} = params;

  return beClient.get(`/company/${id}`).then(res => {
    return res.data;
  })

}
export {loadCompanyDetail};
export default CompanyDetail;