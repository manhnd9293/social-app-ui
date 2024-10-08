import React from 'react';

function AboutTab({company, photos}) {

  return (
    <>
      <div className='has-text-weight-bold my-3'>General information</div>
      <div>
        <div>Size: {company.size}</div>
        <div>Industry: {company.industry}</div>
        <div>Province: {company.province}</div>
        <div>Address: {company.address}</div>
        <div className='mt-4'>
          {company.introduction}
        </div>
      </div>
      {
        company?.photos?.length > 0 &&
        <>
          <div className='has-text-weight-bold my-3'>Images</div>)
          <div className='columns is-multiline is-variable is-3'>
            {
              company.photos.map((photo, index) =>
                <div key={index}
                     className='column is-one-fifth-desktop is-clickable'
                >
                  <figure>
                    <img src={photo}/>
                  </figure>
                </div>
              )
            }
          </div>
        </>
      }

    </>
  );
}

export default AboutTab;