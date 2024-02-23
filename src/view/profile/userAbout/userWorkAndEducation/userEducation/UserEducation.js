import React, {useState} from 'react';
import AddDataBtn from "../../../common/AddDataBtn";

function UserEducation() {
  const [colleges, setColleges] = useState(user.colleges);
  const [highSchools, setHighSchools] = useState(user.highSchools);

  return (
    <>
      <div className={`is-size-6 has-text-weight-bold`}>College</div>
      <AddDataBtn name={`Add college`}/>
      <div className={`mt-4`}>
        {
          colleges.map((college, index) =>
            <div className={`is-flex`} key={`${college.name}-${index}`}>
              <div>
                <figure className={`image is-48x48`}>
                  <img className={`is-rounded`} src={process.env.REACT_APP_DEFAULT_COMPANY_LOGO}></img>
                </figure>
              </div>

              <div className={`is-size-6 ml-3`}>
                <div> Study {`${college.major}`} at <strong>{college.name}</strong></div>
                <div>{college.degree} - Class of {college.endYear}</div>
              </div>
            </div>
          )
        }
      </div>

      <div className={`is-size-6 has-text-weight-bold mt-5`}>High School</div>
      <AddDataBtn name={`Add a high school`}/>
      <div className={`mt-4`}>
        {
          highSchools.map((highSchool, index) =>
            <div className={`is-flex`} key={`${highSchool.name}-${index}`}>
              <div>
                <figure className={`image is-48x48`}>
                  <img className={`is-rounded`} src={process.env.REACT_APP_DEFAULT_COMPANY_LOGO}></img>
                </figure>
              </div>

              <div className={`is-size-6 ml-3`}>
                <div> Went to {highSchool.name}</div>
                <div>Class of {highSchool.endYear}</div>
              </div>
            </div>
          )
        }
      </div>
    </>
  );
}

const user = {
  colleges: [
    {
      name: 'Foreign Trade University',
      major: 'Finance and Banking',
      startYear: 2011,
      endYear: 2015,
      degree: 'Bachelor'
    }
  ],
  highSchools: [
    {
      name: 'HNUE High school for gifted students',
      startYear: 2008,
      endYear: 2011,
    }
  ]
}

export default UserEducation;