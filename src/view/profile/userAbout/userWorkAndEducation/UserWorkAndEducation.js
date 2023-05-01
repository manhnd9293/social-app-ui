import React, {useState} from 'react';
import AddDataBtn from "../../common/AddDataBtn";
import UserEducation from "./userEducation/UserEducation";

function UserWorkAndEducation() {
  const [works, setWorks] = useState(user.works);

  return (
    <div>
      <div className={`is-size-6 has-text-weight-bold`}>Work</div>
      <AddDataBtn name={`Add a workplace`}/>
      <div className={`mt-4`}>
        {
          works.map(work =>
            <div className={`is-flex`} key={work.place}>
              <div>
                <figure className={`image is-48x48`}>
                  <img className={`is-rounded`} src={process.env.REACT_APP_DEFAULT_COMPANY_LOGO}></img>
                </figure>
              </div>

              <div className={`is-size-6 ml-3`}>
                <div>{`${work.title}`} at <strong>{work.company}</strong></div>
                <div>{work.place}</div>
              </div>
            </div>
          )
        }
      </div>
      <div className={`mt-5 mb-3`}><UserEducation/></div>
    </div>
  );
}

const user = {
  works: [
    {
      company: 'Advesa Vietnam',
      title: 'Software engineer',
      place: 'Hanoi, Vietnam',
      currentWorkHere: true,
      fromYear: '2020'
    }
  ]
}

export default UserWorkAndEducation;