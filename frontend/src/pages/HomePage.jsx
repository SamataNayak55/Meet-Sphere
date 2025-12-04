// ...existing code...
import React from 'react';
import myimage from '../assets/download.png';
import "../Styles/App.css";
import JoinAsGuest from './JoinAsGuest';
import logo from '../assets/react.svg'
import {  Router, useNavigate } from 'react-router-dom';

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
          <img id='navImg' src={logo} alt="" />
          <h1 >Meet-sphere</h1>
        </div>
        <div className='navLinks'>
          <h5 onClick={() => navigate('/game')}>Game</h5>
          <h5 onClick={() => navigate('/JoinAsGuest')}>Join as Guest</h5>
          <h5 onClick={() => navigate('/register')}>Register</h5>
        </div>
      </nav>
      <div className='mainContent'>
        <div className='left'>
          <h1> Connect with your Loved Ones  &#x2764; </h1>
          <p>Cover a distance by meet-sphere</p>
          <button onClick={(handleClick)}>Get Started</button>
        </div>
        <div className='right'>
          <img src={myimage} alt="pic" style={{height: "350", width: "300px",display:"block",position:"relative"}} />
        </div>
      </div>
    </div>
  );
}

export default HomePage;
// ...existing code...