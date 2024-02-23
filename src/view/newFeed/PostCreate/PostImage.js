import React, {useEffect, useRef, useState} from "react";

function PostImage({files, setFiles}) {
  const [images, setImages] = useState([]);
  const inputRef = useRef(null);
  const photosRef = useRef(null);
  const imagesRef = useRef([]);


  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImages([...images, reader.result]);
      });

      const newFile = e.target.files[0];
      reader.readAsDataURL(newFile);
      setFiles([...files, newFile]);
    }
  }

  useEffect(() => {
    if (images.length > imagesRef.current.length) {
      photosRef.current.scrollTop = photosRef.current.scrollHeight;
    }

    imagesRef.current = images;
  }, [images])

  function removeFile() {
    setFiles([]);
    setImages([]);
  }

  function removePhoto(index) {
    const clonePhotos = structuredClone(images);
    const cloneFiles = structuredClone(files);

    setImages([...clonePhotos.slice(0, index), ...clonePhotos.slice(index + 1)]);
    setFiles([...cloneFiles.slice(0, index), ...cloneFiles.slice(index + 1)]);
  }


  return (
    <div>
      <div className="file has-name is-info mt-3">
        <label className="file-label">
          <input className="file-input is-small is-rounded"
                 type="file"
                 name="file"
                 ref={inputRef}
                 onChange={onSelectFile}
          />
          <span className="file-cta">
            <span className="file-icon">
              <i className="fa-solid fa-plus"></i>
            </span>
            <span className="file-label">
              Add photos
            </span>
          </span>
        </label>
      </div>
      <div className={`mt-3`}>
        <div className={`button is-danger is-small is-rounded`} onClick={removeFile}>Remove all images</div>
      </div>

      <div className={'mt-3 columns is-multiline'}
           style={{ overflowY: "scroll", maxHeight: 400}}
           ref={photosRef}
      >
        {images.map((url, index) =>
          <div key={index}
               className={`column is-6`}
          >
            <PhoToEdit removePhoto={removePhoto} index={index} url={url}/>
          </div>
        )}
      </div>
    </div>
  );
}


function PhoToEdit({removePhoto, index, url, caption, onSaveCaption}) {
  const [editCaption, setEditCaption] = useState(false);
  const [captionVal, setCaptionVal] = useState(caption || '');

  function cancelCaption() {
    setCaptionVal(caption || '');
    setEditCaption(false);
  }

  function saveCaption() {
    setEditCaption(false);
    onSaveCaption(captionVal.trim(), index);
  }

  return (
    <>
      <div className={` is-flex-grow-1`} >
        <div style={{
          backgroundImage: `url(${url})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          height: 200
        }}>
        </div>


      </div>
      <div className={`mt-2 is-flex is-flex-direction-row is-align-items-center is-justify-content-center`} style={{gap: 10}}>
        <div className={`button is-small is-rounded`} onClick={() => removePhoto(index)}
        >
      <span className={`icon is-small`}>
        <i className="fa-solid fa-trash"></i>
      </span>
        </div>

        <div className={`button is-small is-rounded`} onClick={() => setEditCaption(true)}
             disabled={editCaption}

        >
      <span className={`icon is-small`}>
        <i className="fa-solid fa-scroll"></i>
      </span>
        </div>
      </div>

      {editCaption && <div className="modal is-active">
        <div className="modal-background" onClick={() => setEditCaption(false)}></div>
        <div className="modal-card">
          <header className="modal-card-head">
            <p className="modal-card-title">Edit caption</p>
            <button className="delete" aria-label="close"></button>
          </header>
          <section className="modal-card-body">
           <textarea className={`textarea mt-3`} placeholder={`Caption`} rows={2}
                     value={captionVal}
                     onChange={e => setCaptionVal(e.target.value)}
           ></textarea>
          </section>
          <footer className="modal-card-foot">
            <div>

              <div className={'buttons mt-3'}>
                <div className={`button is-small`} onClick={cancelCaption}>cancel</div>
                <div className={`button is-small is-info`} onClick={saveCaption}
                     disabled={captionVal.trim().length === 0}>
                  Save
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>}
    </>
  )
}

export default PostImage;