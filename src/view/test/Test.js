import React, { useState } from 'react';

function Test() {
  const [li, setLi] = useState('');
  const [showConfirm, setShowConfirm] = useState(false);
  const [data, setData] = useState('');
  const [id, setId] = useState('');

  function submit() {
    if(!li || id){
      updateGw();
    } else if(!id) {
      setShowConfirm(true);
    }
  }

  function updateGw() {
    if (!li || id) {
      console.log({data, id: id || null});
    } else {
      console.log({data, li});
    }
  }

  return (
    <div>
      <div>hello test view</div>
      <div>
        <div>license</div>
        <div>
          <input type={`text`}
                 value={li}
                 onChange={e => setLi(e.target.value)}
          />
        </div>

        <div className={`mt-3`}>
          <div>
            <div>ID</div>
            <div>
              <input type={"text"}
                     value={id}
                     onChange={e => setId(e.target.value)}
              />
            </div>
          </div>
          <div>
            <div>Data</div>
            <div>
              <input type={"text"}
                     value={data}
                     onChange={e => setData(e.target.value)}
              />
            </div>
          </div>
          <button onClick={submit}
                  className={`mt-3`}
          >
            Create gw
          </button>
        </div>
      </div>
      {
        showConfirm &&
        <div className={`mt-3`}>
          <div>Do you want to add license</div>
          <div>
            <button onClick={updateGw}>Yes</button>
            <button className={`ml-3`}
                    onClick={() => setShowConfirm(false)}
            >
              No
            </button>
          </div>
        </div>
      }

    </div>
  );
}


export default Test;