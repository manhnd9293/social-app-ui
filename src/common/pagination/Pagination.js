import React from 'react';
function getPaginationArray({currentPage , totalItem, itemPerPage = 10}) {
  currentPage = currentPage || 1;
  const lastPage = Math.ceil(totalItem / itemPerPage);
  if(lastPage === 0) return [];

  if(currentPage > lastPage) throw 'Invalid current page';
  let mid = [Math.max(currentPage - 1 , 1), currentPage, Math.min(currentPage + 1, lastPage)];

  let first = [];
  for(let i of [1,2,3]) {
    if(lastPage >= i) {
      first.push(i);
    }
  }

  let last = [Math.max(lastPage - 2 , 1), Math.max(lastPage - 1 , 1), lastPage];
  const set = new Set([...first, ...mid, ...last]);
  const list = [...set].sort((a,b) => a-b);
  return list;
}

function Pagination({currentPage, totalItem, itemPerPage = 10, onChangePage}) {
  const listPage = getPaginationArray({currentPage, totalItem, itemPerPage});
  const changePage = (page) => () => {
    if(page === currentPage || page < 1 || page > listPage[listPage.length -1]) return;
    onChangePage(page);
  }
  return (
    <nav className="pagination is-centered" role="navigation" aria-label="pagination">
      {listPage.length > 1 && <a className={`pagination-previous ${currentPage === 1 && `is-disabled`}`}
          onClick={changePage(currentPage - 1)}
      >Previous
      </a>}
      {listPage.length > 1 && <a className={`pagination-next ${currentPage === listPage[listPage.length - 1] && `is-disabled`} `}
          onClick={changePage(currentPage + 1)}
      >
        Next page
      </a>}
      <ul className="pagination-list">
        {
          listPage.map((page, index) => (
            <>
              {index > 0 && listPage[index] > listPage[index - 1] + 1 &&
                <li key={`h-${index}`}>
                  <span className="pagination-ellipsis is-clickable">&hellip;</span>
                </li>
              }
              <li key={index}
                  className={`pagination-link ${currentPage === page ? 'is-current' : ''} is-clickable`}
                  onClick={changePage(page)}
              >{page}</li>
            </>
          ))
        }
      </ul>
    </nav>
  );
}

export default Pagination;