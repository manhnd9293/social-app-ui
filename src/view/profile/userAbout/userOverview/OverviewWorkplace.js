import React, {useState} from 'react';

function OverviewWorkplace() {
  const [work, setWork] = useState(user.work);
  const [editWork, setEditWork] = useState(false);
  const isCurrentUser = true;

  return (
    <div className={`is-flex mt-3 is-justify-content-space-between`}>
      <div>
            <span className={`icon mr-3`}>
              <i className="fa-solid fa-briefcase"></i>
            </span>
        <span>
              {work.title} at {work.company}
            </span>
      </div>
      {
        isCurrentUser &&
        <div className={`mr-6`}>
          <div className={`dropdown is-right ${editWork && `is-active`}`}>
            <div className={`dropdown-trigger`}>
              <div className={`icon is-clickable`}
                   onClick={()=> setEditWork(!editWork)}
              >
                <i className="fa-solid fa-ellipsis"></i>
              </div>
            </div>
            <div className={`dropdown-menu`}>
              <div className={`dropdown-content`}>
                <a className={`dropdown-item`}>Edit workplace</a>
              </div>
              <div className={`dropdown-content`}>
                <a className={`dropdown-item`}>Delete workplace</a>
              </div>
            </div>
          </div>
        </div>
      }
    </div>

  );
}

const user = {
  work: {
    title: 'Software Engineer',
    company: 'Advesa Vietnam'
  }
}

export default OverviewWorkplace;