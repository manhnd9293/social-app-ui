import React from 'react';
import OverviewWorkplace from "./OverviewWorkplace";
import HomeTownInfo from "./HomeTownInfo";
import OverviewCurrentPlace from "./OverviewCurrentPlace";

function UserOverview() {


  return (
    <div>
      <div>Overview</div>
      <OverviewWorkplace/>
      <OverviewCurrentPlace/>
      <HomeTownInfo/>
    </div>
  );
}

export default UserOverview;