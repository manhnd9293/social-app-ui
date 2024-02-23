import React, {useContext, useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import utils from "../../utils/utils";
import {Link, useLoaderData} from "react-router-dom";
import {SocketContext} from "../rootLayout/RootLayout";
import {FriendRequestState, SocketEvent} from "../../utils/Constant";
import {useSelector} from "react-redux";

function SearchResult() {
  const initialPeople = useLoaderData();
  const [people, setPeople] = useState(initialPeople);
  const user = useSelector(state => state.user);
  const socket = useContext(SocketContext);

  useEffect(()=> {
    setPeople(initialPeople)
  }, [initialPeople])

  const addFriend = (friendId) => async () =>{
    const requestBody = {
      message: 'Hi, please accept my request',
      to: friendId,
      from: user._id
    }
    await beClient.post('/request', requestBody).then(res => res.data);

    const update = structuredClone(people);
    const updatePerson = update.find(p => p._id === friendId);
    updatePerson.sentRequest = true;
    setPeople(update);
  }

  const updateRequest = (rId, state) => async () => {
    const conversation = await beClient.path('/request/state', {
      requestId: rId,
      state
    }).then(res => res.data);
    if(state === FriendRequestState.Accepted){
      socket.emit( SocketEvent.AcceptRequest, conversation)
    }

    //todo: continue update ui
  }
  return (
    <div>
      <div className={`subtitle mt-3`}>
        Search view
      </div>
      <div>
        <div className={`subtitle is-5`}>People</div>
        <div className={`list has-visible-pointer-controls has-hoverable-list-items has-background-white`} style={{width: '50%'}}>{
          people.map(p =>
            <div key={p._id} className={`list-item is-hoverable`}>
              <div className={`list-item-image`}>
                <figure className={`image is-64x64`}>
                  <img className={`is-rounded`} src={p.avatar || utils.defaultAvatar}
                       style={{width: 64, height: 64}}
                  />
                </figure>
              </div>
              <div className={`list-item-content`}>
                <Link to={`/profile/${p._id}`}>
                  {p.fullName}
                </Link>
              </div>
              <div className={`list-item-controls`}>
                <div className={`buttons is-right`}>
                  {
                    !p.isFriend && !p.sentRequest && !p.receiveRequest &&
                    <div className={`button is-small is-info`}
                         onClick={addFriend(p._id)}
                    >Send a request</div>
                  }
                  {
                    p.isFriend && <button className="button is-small">
                    Unfriend
                  </button>
                  }
                  {
                    p.sentRequest &&
                    <button className={'button is-small'}>
                      Cancel request
                    </button>
                  }
                  {
                    p.receiveRequest &&
                    <>
                      <button className={`button is-small is-info`}>
                        Accept Request
                      </button>
                      <button className={`button is-small`}>
                        Ignore
                      </button>
                    </>
                  }
                </div>
              </div>
            </div>
          )
        }</div>
      </div>
    </div>
  );
}
function loadSearchResult({request}) {
  const {key: search} = utils.getUrlQueryParamsFromRequest(request, ['key']);
  return beClient.get(`/user?search=${search}`).then(res => res.data);
}

export {loadSearchResult}

export default SearchResult;