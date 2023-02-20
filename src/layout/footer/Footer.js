import React from 'react';
import {useSelector} from "react-redux";

function Footer(props) {
  const user = useSelector(state => state.user);
  if (!user._id) return null;
  return (
    <footer className="footer">
      <div className="content has-text-centered">
        <p>
          <strong>Huni</strong> by <a href="https://jgthms.com">Manh Nguyen</a>. The source code is licensed
        </p>
      </div>
    </footer>
  );
}

export default Footer;