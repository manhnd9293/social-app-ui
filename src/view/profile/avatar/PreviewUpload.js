import React, {useRef, useState} from 'react';
import ReactLoading from "react-loading";
import {beClient} from "../../../config/BeClient";
import {useDispatch} from "react-redux";
import {userActions} from "../../../store/UserSlice";

function PreviewUpload({setEditing, setShowModal}) {
  const photoRef = useRef();
  const [imgSrc, setImgSrc] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  async function uploadAvatar() {
    if(!file) return;
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    await beClient.patch(`/user/avatar`, data, {
      headers: {
        "Content-Type": 'multipart/form-data'
      }
    }).then((res) => {
      dispatch(userActions.updateAvatar(res.data));
    }).finally(() => {
      setLoading(false);
      setFile(null);
      setShowModal(false);
    })
  }

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => setImgSrc(reader.result));
      const file = e.target.files[0];
      reader.readAsDataURL(file);

      setFile(file);
    }
  }

  return (
    <>
      <div className={`modal-card-body has-background-white-ter`}>
        <div className={`is-flex is-justify-content-center is-align-items-center`}>
          {
            loading && <ReactLoading type={'bubbles'}
                                     color={'#3e8ed0'}
                                     height={'10%'}
                                     width={'10%'}/>
          }
          {
            !loading && !file && (
              <div className="file is-boxed">
                <label className="file-label">
                  <input className="file-input"
                         type="file"
                         name="profile"
                         ref={photoRef}
                         onChange={onSelectFile}
                  />
                  <span className="file-cta">
              <span className="file-icon">
                <i className="fas fa-upload"></i>
              </span>
              <span className="file-label">
                Choose a file…
              </span>
            </span>
                </label>
              </div>
            )
          }
          {
            !loading && file && (
              <div>
                <figure className='image is-128x128 mt-3'>
                  <img src={imgSrc} style={{width: 128, height: 128}} className={`is-rounded has-background-white`}/>
                </figure>
                <div className={'mt-4 has-text-centered'}>
                  <button className={`button is-small is-rounded is-bordered is-danger`}
                          onClick={event => setFile(null)}
                  > Remove </button>
                </div>
              </div>
            )
          }
        </div>
      </div>
      <div className={`modal-card-foot`}>
        <button className={`button`} onClick={event => setEditing(false)}>Cancel</button>
        <button className={`button is-info`} disabled={!file} onClick={uploadAvatar}>Upload</button>
      </div>
    </>
  );
}

export default PreviewUpload;