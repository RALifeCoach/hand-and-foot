import React from 'react'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography
} from '@mui/material'
import FlexColumn from '../shared/flex-grid/FlexColumn'
import FlexRow from '../shared/flex-grid/FlexRow'
import {IServerQuestion, IServerQuestionButton} from '../queries/game'
import Spacer from '../shared/Spacer'
import useSendMessage from './hooks/useSendMessage'

interface IProps {
  serverQuestion: IServerQuestion;
}

const ServerQuestion = ({serverQuestion}: IProps) => {
  const sendMessage = useSendMessage()

  const handleClick = (button: IServerQuestionButton) => () => {
    sendMessage(button.sendType, button.sendValue)
  }

  const width = 350
  const height = 600
  return (
    <>
      <Dialog
        open={true}
        disableEscapeKeyDown
        PaperProps={{
          style: {
            width,
            height,
            maxWidth: width,
            maxHeight: height,
            minWidth: width,
            minHeight: height,
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h2">
            {serverQuestion.title}
          </Typography>
        </DialogTitle>
        <DialogContent>
          <FlexColumn>
            <Divider style={{width: '100%'}}/>
            <div>{serverQuestion.message}</div>
          </FlexColumn>
        </DialogContent>
        <DialogActions>
          <FlexRow justify="flex-end">
            {serverQuestion.buttons.map((button: any, index: number) => (
              <div key={index}>
                <Button
                  onClick={handleClick(button)}
                >
                  {button.text}
                </Button>
                <Spacer/>
              </div>
            ))}
          </FlexRow>
        </DialogActions>
      </Dialog>
    </>
  )
}

export default ServerQuestion
