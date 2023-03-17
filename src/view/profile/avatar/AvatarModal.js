import React, {useEffect, useState} from 'react';
import PreviewUpload from "./PreviewUpload";
import ViewAvatar from "./ViewAvatar";

const AvatarModal = ({avatar, setShowModal}) => {
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    document.getElementById('app-body').classList.add('is-clipped')

    return () => {
      document.getElementById('app-body').classList.remove('is-clipped')
    };
  }, []);

  return (
    <div className={`modal is-active`}>
      <div className={`modal-background`} onClick={event => setShowModal(false)}></div>
      <div className={`modal-card`}>
        <div className={`modal-card-head`}>
          <div className={`modal-card-title`}>Profile picture</div>
        </div>
        {!editing && <ViewAvatar avatar = {avatar} setEditing={setEditing} setShowModal={setShowModal}/>}
        {editing && <PreviewUpload setEditing={setEditing} setShowModal={setShowModal}/>}
      </div>
    </div>
  );
};

export default AvatarModal;
