import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import utils from "../../../utils/utils";

const sponsors = [
  {
    url: 'https://aws.amazon.com',
    banner: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/93/Amazon_Web_Services_Logo.svg/800px-Amazon_Web_Services_Logo.svg.png',
    name: 'AWS'
  },
  {
    url: 'https://docker.com',
    banner: 'https://storage.googleapis.com/static.ianlewis.org/prod/img/docker/large_v-trans.png',
    name: 'Docker'
  },
  {
    url: 'https://mongodb.com',
    banner: 'https://res.cloudinary.com/hevo/image/upload/v1626694700/hevo-blog/MongoDB-sm-logo-500x400-1-1.gif',
    name: 'mongoDB'
  }
]

function Sponsors() {
  return (
    <div style={{position: 'sticky', top: 72}}>
      <div className={`subtitle is-5`}>Sponsors</div>
      {
        sponsors.map(s =>
          <Link to={s.url} key={s.name} className={`is-clickable mt-5 has-text-black is-block`}
          >
            <div className={`columns`}>
              <div className={`column is-6 has-background-white`}>
                <figure className={`is-64x64`}>
                  <img src={s.banner}/>
                </figure>
              </div>
              <div className={`is-6 ml-3 is-flex is-flex-direction-column is-justify-content-center`}>
                <div className={`has-text-weight-bold`}>{
                  s.name
                }</div>
                <div>{s.url.split('/').reverse()[0]}</div>
              </div>
            </div>
          </Link>
        )
      }
    </div>
  );
}

export default Sponsors;