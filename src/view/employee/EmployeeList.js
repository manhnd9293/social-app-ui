import React from 'react';
import Card from "./Card";
import Pagination from "../../common/pagination/Pagination";

function EmployeeList() {
  return (
    <>
      <div className="columns is-multiline">
        {
          [...Array(1).keys()].map((key) => (
            <div key={key} className="column is-one-quarter">
              <Card/>
            </div>
          ))
        }
      </div>
      <div className='container'>
          <Pagination/>
      </div>
    </>
  );
}

export default EmployeeList;