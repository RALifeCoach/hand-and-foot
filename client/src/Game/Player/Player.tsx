import React from 'react'
import Hand from '../Hand/Hand'
import {IPlayerCurrent} from 'Game'
import {Paper} from '@mui/material'
import FlexRow from '../../shared/flex-grid/FlexRow'
import PlayerAction from './PlayerAction'
import DiscardPile from './DiscardPile'
import PlayersStats from './PlayersStats'
import AllTeamMelds from '../Meld/AllTeamMelds'
import PickupPile from './PickupPile'
import {useRecoilValue} from 'recoil'
import {cardMovingAtom, gameBaseAtom, gamePlayAtom, selectedAtom, sortOrderAtom} from '../../atoms/game'

interface IProps {
  player: IPlayerCurrent;
}

const Player = ({player}: IProps) => {
  const gameBase = useRecoilValue(gameBaseAtom)
  const gamePlay = useRecoilValue(gamePlayAtom)
  const selected = useRecoilValue(selectedAtom)
  const sortOrder = useRecoilValue(sortOrderAtom)
  const cardMoving = useRecoilValue(cardMovingAtom)

  if (!gamePlay || !gameBase) {
    return null
  }

  return (
    <>
      <Paper elevation={1} style={{margin: 8}}>
        <div className="flex flex-col gap-3 ml-2">
          <div className="flex gap-3">
            <PlayersStats
              gamePlay={gamePlay}
              player={player}
            />
            <PlayerAction
              gamePlay={gamePlay}
            />
          </div>
          <Hand
            options={{}}
            cards={gamePlay.currentPlayer.cards}
            selected={selected}
            sortOrder={sortOrder}
            cardMoving={cardMoving}
          />
        </div>
        <FlexRow style={{height: 120, width: '100%', position: 'relative', paddingLeft: 8}}>
          <FlexRow>
            <div style={{width: 80}}>
              <PickupPile
                pileIndex={0}
              />
            </div>
            <div style={{width: 80}}>
              <PickupPile
                pileIndex={1}
              />
            </div>
            <div style={{width: 80}}>
              <DiscardPile/>
            </div>
            <div style={{width: 80}}>
              <PickupPile
                pileIndex={2}
              />
            </div>
            <div style={{width: 80}}>
              <PickupPile
                pileIndex={3}
              />
            </div>
          </FlexRow>
        </FlexRow>
        <AllTeamMelds/>
      </Paper>
    </>
  )
}

export default Player
