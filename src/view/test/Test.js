import React, {useEffect, useState} from 'react';
import {beClient} from "../../config/BeClient";
import {useInfiniteQuery} from "react-query";

async function loadTests({pageParam = 0}) {
  return beClient.get(`/test?lastId=${pageParam}`);
}

function Test() {

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status
  } = useInfiniteQuery({
    queryKey: ['tests'],
    queryFn: loadTests,
    getNextPageParam: (lastPage, pages) => {
      if(!lastPage.hasNext) return false;

      const lastId = lastPage.items[lastPage.items.length -1];
      // debugger
      return lastId;
    }
  });

  const [t, setT] = useState(0);

  useEffect(()=> {
    console.log({t})
  }, [t])

  useEffect(() => {
    console.log('load new page');
  }, [data?.pages?.length])

  return status === 'loading' ? (
    <p>Loading...</p>
  ) : status === 'error' ? (
    <p>Error: {error.message}</p>
  ) : (
    <>
      {data.pages.map((group, i) => (
        <React.Fragment key={i}>
          {group.items.map((item) => (
            <p key={item}>{item}</p>
          ))}
        </React.Fragment>
      ))}
      <div>
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
        >
          {isFetchingNextPage
            ? 'Loading more...'
            : hasNextPage
              ? 'Load More'
              : 'Nothing more to load'}
        </button>
      </div>
      <div>{isFetching && !isFetchingNextPage ? 'Fetching...' : null}</div>
      <div className={'mt-4'}>{t}</div>
      <button onClick={() => setT(t => t + 1)}>Change T</button>
    </>)
}


export default Test;