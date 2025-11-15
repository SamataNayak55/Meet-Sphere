// ...existing code...
import React from 'react';
import myimage from '../assets/download.png';
import "../App.css"
import { Navigate, useNavigate } from 'react-router-dom';

function HomePage() {
  const colors = ['#3B0404', '#b95c50', '#deb3ad'];

  // generate hearts once
  const hearts = React.useMemo(() => {
    return Array.from({ length: 22 }).map(() => {
      return {
        left: `${Math.floor(Math.random() * 100)}%`,
        dur: `${(2.5 + Math.random() * 2.5).toFixed(2)}s`,
        color: colors[Math.floor(Math.random() * colors.length)]
      };
    });
  }, []);
  const navigate = useNavigate();

  const handleClick = () => {
    // Instead of <Navigate to="/some-path" />
    navigate('/register');
  };

  return (
    <div>
      {/* heart background */}
      <div className="heart-bg" aria-hidden="true">
        {hearts.map((h, i) => (
          <i
            key={i}
            className="heart"
            style={{
              left: h.left,
              // set CSS vars for color and duration
              ['--c']: h.color,
              ['--dur']: h.dur
            }}
          />
        ))}
      </div>

      <nav id='navigation'>
        <div className='navHeader'>
          <h1 onClick={() => Navigate('/')}>GoVideoS</h1>
        </div>
        <div className='navLinks'>
          <h5 onClick={() => navigate('/joinAsGuest')}>Join as Guest</h5>
          <h5 onClick={handleClick}>Register</h5>
        </div>
      </nav>
      <div className='mainContent'>
        <div className='body'>
          <h1> Connect with your Loved Ones  &#x2764; </h1>
          <p>Cover a distance by GoVideoS</p>
          <button onClick={(handleClick)}>Get Started</button>
        </div>
        <div className='body'>
          <img src={myimage} alt="pic" style={{height: "350px", width: "200px",display:"block",marginLeft:"auto",position:"relative"}} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
// ...existing code...