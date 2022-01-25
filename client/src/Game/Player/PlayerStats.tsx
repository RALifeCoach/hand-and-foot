import React from 'react'
import {ITeam} from '../../../models/game'
import cx from 'clsx'

interface IProps {
  playerName: string;
  isPlayerTurn: boolean;
  cards: number;
  isInHand: boolean;
  team: ITeam;
}

const PlayerStats = ({playerName, isPlayerTurn, cards, isInHand, team}: IProps) => {
  return (
    <div className={cx(
      'flex flex-col mt-4 p-2',
      {'bg-red-400 color-white': isPlayerTurn, 'bg-gray-300': !isPlayerTurn}
    )}>
      <div>{playerName}</div>
      <div>Cards: {cards}</div>
      <div>In: {isInHand ? 'Hand' : 'Foot'}</div>
    </div>
  )
}

export default PlayerStats
