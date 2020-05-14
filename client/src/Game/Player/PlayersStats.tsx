import React from 'react';
import FlexRow from "../../shared/flex-grid/FlexRow";
import { IGamePlay, IPlayerCurrent } from 'Game';
import PlayerStats from './PlayerStats';

interface IProps {
  gamePlay: IGamePlay;
  player: IPlayerCurrent;
}

const PlayersStats = ({ gamePlay, player }: IProps) => {
  return (
    <FlexRow>
      <PlayerStats
        playerName={player.playerName || `Player: ${player.playerId}`}
        isPlayerTurn={player.isPlayerTurn}
        cards={player.cards.length}
        isInHand={player.isInHand}
        team={gamePlay.teams[player.teamId]}
      />
      <FlexRow>
        {gamePlay.otherPlayers.map(player => (
          <FlexRow key={player.playerId}>
            <PlayerStats
              playerName={player.playerName || `Player: ${player.playerId}`}
              isPlayerTurn={player.isPlayerTurn}
              cards={player.cards}
              isInHand={player.isInHand}
              team={gamePlay.teams[player.teamId]}
            />
          </FlexRow>
        ))}
      </FlexRow>
    </FlexRow>
  );
};

export default PlayersStats;
