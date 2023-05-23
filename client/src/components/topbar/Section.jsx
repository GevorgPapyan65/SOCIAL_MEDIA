import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import './section.css';
import { Link } from 'react-router-dom';

export default function Section({ search }) {
  const [hiddenElements, setHiddenElements] = useState([]);

  const handleClick = (index) => {
    setHiddenElements((prevHiddenElements) => [...prevHiddenElements, index]);
  };

  return (
    <div>
      {search.map((e, index) => (
        
          <div className={`postTop1 ${hiddenElements.includes(index) ? 'hidden' : ''}`} key={e.id}>
            <Link style={{textDecoration: "none", color: "black"}} to={`profile/${e.username}`}> 
          <div className="postTopLeft1">
            <img className='postProfileImg1' src="http://localhost:8800/images/person/8.jpeg" alt="" />
            <span className='postUsername1'>{e.username}</span>
          </div>
        </Link>
        
          <div className="postTopRight1">
            <Close className='' onClick={() => handleClick(index)} />
          </div>
        </div>
      ))}
    </div>
  );
}

