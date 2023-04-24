import React from "react";
import {ListReaction} from "../../../utils/Constant";

function PostInteractData({totalReaction, comments}) {
  const totalReactionCount = totalReaction.reduce((total, reaction) => total + reaction.value, 0);
  const sortReactions = structuredClone(totalReaction).filter(r => r.value > 0).sort((a, b) => b.value - a.value);
  if (totalReactionCount === 0 && comments.length === 0) return null;
  return (
    <>
      <div className={`is-flex is-justify-content-space-between`}>
        <div className={`is-flex is-align-items-center`} style={{flexBasis: '50%'}}>
          {sortReactions.map((r, index) =>
            <div style={{
              backgroundColor: 'white',
              borderRadius: 30, width: 30, textAlign: 'center',
              border: '1px solid white',
              marginLeft: `${index > 0 ? '-8px' : 0}`,
              zIndex: Number(10 - index)
            }}
                 className={`is-size-6`}
                 key={r.type}
            >
              {getEmotion(r.type)}
            </div>)}
          <span className={`ml-1`}>{totalReactionCount > 0 ? totalReactionCount : ''}</span>
        </div>
        {
          comments > 0 &&
          <div>{comments} comment{comments > 1 && 's'} </div>
        }
      </div>
      <div style={{height: 1, backgroundColor: '#dcdbdb'}} className={`mt-2`}/>
    </>
  )
}

function getEmotion(reactionType) {
  const reaction = ListReaction.find(r => r.value === reactionType);
  return reaction.label;
}

export default PostInteractData;