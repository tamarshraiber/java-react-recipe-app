import React from 'react';
import { useNavigate } from 'react-router-dom';
import video from '../../public/video/welcome.mp4';
import Button from '@mui/material/Button';



const WelcomeComp = () => {
  const navigate = useNavigate();

  function login() {
    navigate('/login');
  }

  function signup() {
    navigate('/signup');
  }

  return (
    <div>
      <video
        controls
        muted
        autoPlay
        width="100%"
        loop
        height="880vh"
        style={{ objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}>
        <source src={video} type="video/mp4" />
        video not found
      </video>
      <div style={{ position: 'absolute', top: '92%', left: '20%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ margin: '4px' }}>

          <Button
            variant="outlined"
            sx={{
              width: '12vw',
              position: 'fixed',
              bottom: '4vh',
              right: '-6vw',
              backgroundColor: '#D8A7B1',
              color: '#fff',
              padding: '12px 36px',
              fontSize: '18px',
              borderWidth: 3,
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#D18F9B',
                borderColor: '#FFB6C1',
              },
            }}
            onClick={login}
          >
            Login
          </Button>

          <Button
            variant="outlined"
            sx={{
              width: '12vw',
              position: 'fixed',
              bottom: '-8vh',
              right: '-6vw',
              backgroundColor: '#D8A7B1',
              color: '#fff',
              padding: '12px 36px',
              fontSize: '18px',
              borderWidth: 3,
              borderRadius: '8px',
              fontWeight: 'bold',
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#D18F9B',
                borderColor: '#FFB6C1',
              },
            }}
            onClick={signup}
          >
            Sign Up
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WelcomeComp;
