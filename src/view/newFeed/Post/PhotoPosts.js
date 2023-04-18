import utils from "../../../utils/utils";
import React from "react";

function PhotoPosts({photoPosts}) {
  if (!photoPosts || photoPosts.length === 0) {
    return null;
  }

  if (photoPosts.length === 2) {
    return (
      <div>
        {
          photoPosts.map(post =>
            <div key={post._id}
                 style={{...utils.getStyleForImageBackground(post.url), height: 250}}
                 className={`mt-1 is-clickable`}
            ></div>
          )
        }
      </div>
    );
  }

  if (photoPosts.length === 3) {
    return (
      <div>
        <div style={{
          ...utils.getStyleForImageBackground(photoPosts[0].url),
          height: 300
        }}></div>
        <div className={`columns mt-1 px-3 mb-2 is-4`}>
          {[photoPosts[1], photoPosts[2]].map(post =>
            <div style={{
              ...utils.getStyleForImageBackground(post.url),
              height: 300
            }}
                 className={`column`}
                 key={post._id}
            ></div>
          )}
        </div>
      </div>
    )
  }

  return (
    <div>
      <div style={{
        ...utils.getStyleForImageBackground(photoPosts[0].url),
        height: 300
      }}
           className={`is-clickable mt-3`}
      ></div>
      <div className={`is-flex mt-1 mb-2 `} style={{gap: 4}}>
        {[photoPosts[1], photoPosts[2], photoPosts[3]].map(post =>
          <div style={{
            ...utils.getStyleForImageBackground(post.url),
            height: 180
          }}
               className={`column is-clickable`}
               key={post._id}
          ></div>
        )}
      </div>

    </div>
  )
}

export default PhotoPosts;