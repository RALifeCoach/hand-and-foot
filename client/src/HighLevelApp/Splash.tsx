import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@mui/material'
import HandImage from '../assets/hand.jpeg'
import FootImage from '../assets/foot.jpeg'

const Splash = () => {
  const navigate = useNavigate()
  return (
    <div className="flex flex-col items-center gap-12 mt-20">
      <div className="text-3xl font-bold">Welcome to Hand and Foot</div>
      <div className="flex gap-8 w-full justify-center">
        <img src={HandImage} alt="hand" width={160}/>
        <p className="mt-4 w-1/3">
          Hand and foot is a game loosely based on Canasta. There are many variations
          of the game, many of which are covered in this game.
        </p>
        <img src={FootImage} alt="foot" width={160}/>
      </div>
      <div className="">
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate('/login')}>
          Login
        </Button>
      </div>
    </div>
  )
}

export default Splash
