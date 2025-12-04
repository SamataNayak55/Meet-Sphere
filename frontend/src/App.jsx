import './App.css';
import React from 'react';
import {Route , BrowserRouter as Router, Routes} from 'react-router-dom';
import HomePage from './pages/HomePage';
import { AuthProvider } from './contexts/AuthContext';
import Register from './pages/Register';
import VideoMeet from './pages/videomeet';
import LandingPage from './pages/landing';
import JoinAsGuest from './pages/JoinAsGuest';
import History from './pages/history';
import TodoWrapper from './pages/Todo';
import Game from './pages/game';

//import withAuth from './utils/withAuth';

const App = () => {
  return (
    <div>
        <Router>
          <AuthProvider>
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path='/JoinAsGuest' element={<JoinAsGuest />}/>
            <Route path='/Register' element={<Register />}/>
            <Route path='/game' element={<Game />}/>
            <Route path='/todo' element={<TodoWrapper />}/>
            <Route path='/home' element={<LandingPage />}/>
            <Route path='/history' element={<History />}/>
            <Route path='/:url' element={<VideoMeet />} />

          </Routes>
          </AuthProvider>
        </Router>
    </div>
  );
}

export default App;
