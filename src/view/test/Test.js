import React, {useState} from 'react';
import Pagination from "../../common/pagination/Pagination";
import {useNavigate} from "react-router-dom";

function Test() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  function onChangePage(page) {

    setCurrentPage(page)
  }

  function buttonCLick(e) {
    e.stopPropagation();
    console.log('button');
  }

  function outSideClick() {
    console.log('outSide div');
  }

  return (
    <div>
      <Pagination currentPage={currentPage}
                  totalItem={100}
                  onChangePage={onChangePage}
      />
      <div className='has-background-info' style={{width: 200, height: 200}} onClick={outSideClick}>
        <div>
          <button onClick={buttonCLick}>Me</button>
        </div>
      </div>
      <div>
        <div>
          <div>hello world</div>
        </div>
      </div>

    </div>
  );
}

export default Test;