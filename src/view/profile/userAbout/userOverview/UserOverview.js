import React from 'react';
import OverviewWorkplace from "./OverviewWorkplace";
import HomeTownInfo from "./HomeTownInfo";
import OverviewCurrentPlace from "./OverviewCurrentPlace";
import UserRelationshipOverview from "./UserRelationshipOverview";

function UserOverview() {

  return (
    <div>
      <div>Overview</div>
      <OverviewWorkplace/>
      <OverviewCurrentPlace/>
      <HomeTownInfo/>
      <UserRelationshipOverview/>
    </div>
  );
}

export default UserOverview;