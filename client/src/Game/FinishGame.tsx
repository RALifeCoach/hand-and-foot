import React from 'react'
import {
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
} from '@mui/material'
import FlexColumn from '../shared/flex-grid/FlexColumn'
import Spacer from '../shared/Spacer'
import {IFinishGame} from '../../models/game'
import {useNavigate} from 'react-router'

interface IProps {
  finishGame: IFinishGame;
}

const FinishGame = ({ finishGame }: IProps) => {
  const navigate = useNavigate()
  const handleClick = () => {
    navigate('/games')
  }

  return (
    <>
      <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-80 z-50 flex justify-center items-center">
        <div className="bg-white w-1/3 h-1/2 opacity-100">
          <DialogTitle>
            <div className="text-2xl font-bold text-black">
              {finishGame.title}
            </div>
          </DialogTitle>
          <DialogContent>
            <FlexColumn>
              <Divider style={{ width: '100%' }}/>
              <div>{finishGame.message}</div>
            </FlexColumn>
          </DialogContent>
          <DialogActions>
            <div className="flex justify-end  gap-4">
                <div>
                  <Button
                    onClick={handleClick}
                    variant="outlined"
                    color="primary"
                  >
                    Okay
                  </Button>
                  <Spacer/>
                </div>
            </div>
          </DialogActions>
        </div>
      </div>
    </>
  )
}

export default FinishGame
