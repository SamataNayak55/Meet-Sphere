
import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
//import "../Styles/App.css";
import myimage from '../assets/download.png'
import logo from "../assets/react.svg"
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {
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

 



  let navigate = useNavigate();
  const [meetingCode, setMeetingCode] = useState("");


  const { addToUserHistory } = useContext(AuthContext);
  let handleJoinVideoCall = async () => {
    await addToUserHistory(meetingCode)
    navigate(`/${meetingCode}`)
  }

  return (
    <>
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

      <nav id="navigation">

        <div className="navHeader">
          <img id='navImg' src={logo} alt="" />
          <h1>Meet-sphere</h1>
        </div>

        <div className='navLinks' style={{ display: "flex", alignItems: "center" }}>
           <h5 onClick={() => navigate('/todo')}>get things done</h5>

          <h5 onClick={
            () => {
              navigate("/history")
            }
          }>
            <RestoreIcon />
          </h5>
          <h5 onClick={() => { navigate("/history") }}>History</h5>
          <h5 onClick={() => navigate('/game')}>Game</h5>
          <h5 onClick={() => {navigate("/todo")}}>Get things done</h5>

          <h5 onClick={() => {
            localStorage.removeItem("token")
            navigate("/")
          }}>
            Logout
          </h5>
        </div>


      </nav>


      <div className="mainContent">
        <div className="left">
          <div>
            <h1> Connect with your Loved Ones  &#x2764; </h1>
            <p>Cover a distance by meet-sphere</p>
            <div className='buttonArea' style={{ display: 'flex', gap: "10px" }}>

              <textarea onChange={e => setMeetingCode(e.target.value)} id="outlined-basic" label="Meeting Code" variant="outlined"></textarea> 

              <button className='button-landing' onClick={handleJoinVideoCall} variant='contained'>Join</button>

            </div>
          </div>
        </div>
        <div className='right'>
          <img src={myimage} alt="pic" style={{ height: "350", width: "300px", display: "block", position: "relative" }} />
        </div>
      </div>
    </>
  )
}


export default withAuth(HomeComponent)
