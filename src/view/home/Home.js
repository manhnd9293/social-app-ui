import React, {useRef, useState} from 'react';
import logo from './default-img.jpeg'
import axios from "axios";
const defaultFileName = 'No file is selected'
function Home() {
  const [imgSrc, setImgSrc] = useState(logo);
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  function onSelectFile(e) {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  }

  async function uploadFile() {
    if (!file) {
      return;
    }
    setLoading(true);
    const data = new FormData();
    data.append('file', file);
    const response = await axios.patch(`http://localhost:5000/employee/upload`, data, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    }).finally(() => {
      setLoading(false);
    })
    setImgSrc(response.data.url);

  }

  return (
    <div>

      <div>Test upload to s3</div>
      <figure className='image is-128x128 mt-3'>
        <img src={imgSrc}/>
      </figure>

      <div className="file has-name is-info mt-3">
        <label className="file-label">
          <input className="file-input"
                 type="file"
                 name="file"
                 ref={inputRef}
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
          <span className='file-name'>
            {file?.name || defaultFileName}
          </span>
        </label>
      </div>
      <button className={`button is-info mt-3 ${loading ? 'is-loading' : ''}`}
              onClick={uploadFile}
      >
        Upload
      </button>
    </div>
);
}

export default Home;