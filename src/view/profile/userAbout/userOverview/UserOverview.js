import React, {useState} from 'react';
import OverviewWorkplace from "./OverviewWorkplace";

function UserOverview() {


  return (
    <div>
      <div>Overview</div>
      <OverviewWorkplace/>
    </div>
  );
}

const user = {
  work: {
    title: 'Software Engineer',
    company: 'Advesa Vietnam'
  }
}

export default UserOverview;