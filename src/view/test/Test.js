import React, {useState} from 'react';
import Pagination from "../../common/pagination/Pagination";
import {useNavigate} from "react-router-dom";

function Test() {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  function onChangePage(page) {

    setCurrentPage(page)
  }
  return (
    <div>
      <Pagination currentPage={currentPage}
                  totalItem={100}
                  onChangePage={onChangePage}
      />
    </div>
  );
}

export default Test;