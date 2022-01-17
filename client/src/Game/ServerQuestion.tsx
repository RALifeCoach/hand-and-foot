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
import useSendMessage from './hooks/useSendMessage'
import { IServerQuestion, IServerQuestionButton } from '../../../server/models/game'

interface IProps {
  serverQuestion: IServerQuestion;
}

const ServerQuestion = ({ serverQuestion }: IProps) => {
  const sendMessage = useSendMessage()

  const handleClick = (button: IServerQuestionButton) => () => {
    sendMessage(button.sendType, { partnerAgreed: button.sendValue })
  }

  return (
    <>
      <div className="absolute inset-0 w-full h-full bg-gray-300 opacity-80 z-50 flex justify-center items-center">
        <div className="bg-white w-1/3 h-1/2 opacity-100">
          <DialogTitle>
            <div className="text-2xl font-bold text-black">
              {serverQuestion.title}
            </div>
          </DialogTitle>
          <DialogContent>
            <FlexColumn>
              <Divider style={{ width: '100%' }}/>
              <div>{serverQuestion.message}</div>
            </FlexColumn>
          </DialogContent>
          <DialogActions>
            <div className="flex justify-end  gap-4">
              {serverQuestion.buttons.map((button: any, index: number) => (
                <div key={index}>
                  <Button
                    onClick={handleClick(button)}
                    variant="outlined"
                    color={button.color}
                  >
                    {button.text}
                  </Button>
                  <Spacer/>
                </div>
              ))}
            </div>
          </DialogActions>
        </div>
      </div>
    </>
  )
}

export default ServerQuestion
