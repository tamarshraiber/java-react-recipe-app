import React from 'react'
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import video from '../../public/video/homePage.mp4'


const HomeComp = () => {

  const navigate = useNavigate();

  function listRecipeBook() {
    navigate('/recipeBook')
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
        vidoe not found
      </video>
      <div style={{ position: 'absolute', top: '92%', left: '20%', transform: 'translate(-50%, -50%)' }}>
        <div style={{ margin: '4px' }}>

          <Button
            onClick={listRecipeBook}
            sx={{
              textTransform: 'none',
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              backgroundColor: '#D8A7B1',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#D18F9B',
              },
              padding: '10px 20px',
              borderRadius: '8px',
              fontWeight: 'bold',
            }}
          >
            my list recipeBooks
          </Button>

        </div>
      </div>
    </div>

  )
}
export default HomeComp;