import React, {useEffect} from 'react';

import ReactLoading from 'react-loading';
function Loader({active}) {
  useEffect(()=> {
    if (active) {
      document.getElementById('app-body').classList.add('is-clipped')
    } else {
      document.getElementById('app-body').classList.remove('is-clipped')

    }
  }, [active])
  return (
    <div className={`modal ${active && 'is-active'}`}>
      <div className={'modal-background has-background-white'}></div>
      <div className={'modal-content'}>
        <div className={'is-flex is-flex-direction-column is-justify-content-center is-align-items-center'}>
          <div>
            <strong className={'has-text-info has-text-weight-bold is-size-4'}>HUNI</strong>
          </div>
          <ReactLoading type={'bubbles'}
                        color={'#3e8ed0'}
                        height={'10%'}
                        width={'10%'}/></div>
      </div>
    </div>
  );
}

export default Loader;