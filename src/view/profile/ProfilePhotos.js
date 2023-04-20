import React from 'react';
import utils from "../../utils/utils";

function ProfilePhotos({user}) {
  return (
    <div className={`card mt-3`}>
      <div>
        <strong className={`ml-1`}>Photos</strong>
      </div>
      <div className={`mt-1 columns is-multiline`}
           style={{width: '100%', margin: 0}}>
        {
          user.recentPhotos.map((photo) =>
            <div className={`column is-4 is-clickable`}
                 key={utils.objectId()}
                 style={{padding:2}}>
              <figure className={`image`}>
                <div style={{...utils.getStyleForImageBackground(photo.url), height: 128}}></div>
              </figure>
            </div>
          )
        }
      </div>
    </div>
  );
}

export default ProfilePhotos;