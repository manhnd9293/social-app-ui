import React, {useEffect, useState} from 'react';

function Test() {
  const [show, setShow] = useState(true);
  const [p, setP] = useState(1);


  function handleClick() {
    return e => {
      setShow(s => !s);
      // setP(p => p+1)
    };
  }

  return (
    <div>
      <div>
        <button onClick={handleClick()}>Click</button>
      </div>
      <div>{show && <Chi p={p}/>}</div>

    </div>
  );
}


function Chi({p}) {
  const [f, setF] = useState(false);
  const [me, setMe] = useState(1);
  useEffect(() => {
    return () => {
      console.log('clean in Chi');
    };
  }, [me]);

  return (
    <div>
      <div>Chi</div>
      <div>
        <button onClick={e => setMe(c => !c)}>Chi Btn</button>
        <button onClick={e => setMe(c => c+ 1)}>Me Btn</button>
      </div>
      <div>{p}</div>
    </div>
  )
}
export default Test;