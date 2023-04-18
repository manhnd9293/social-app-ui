import React, {useEffect} from "react";
import {ListReaction, Reaction} from "../../../utils/Constant";
import utils from "../../../utils/utils";

const CurrentReaction = React.forwardRef(({reaction, showListReaction, hideListReaction, reactPost}, ref) =>{
  const reactionData = ListReaction.find(r => r.value === reaction) ||
    {
      value: Reaction.Like
    };

  useEffect(() => {
    clearTimeout(ref.current);
  }, [reaction])
  return (
    <div
      className={`column is-flex is-justify-content-center is-align-items-center  `}
    >

      <div className={`button is-white`}
           onMouseOver={showListReaction}
           onMouseOut={hideListReaction}
           onClick={() => {
             reactPost(reactionData.value);
           }}
      >
        {reaction && <span className={'is-size-5 mr-1'}>{reactionData.label}</span>}
        {
          !reaction && <span className={'icon is-size-5 mr-1'}>
          <i className="fa-regular fa-thumbs-up"></i>
        </span>

        }
        <span>{utils.upperCaseFirst(reactionData.value)}</span>
      </div>
    </div>
  )

})

export default CurrentReaction;