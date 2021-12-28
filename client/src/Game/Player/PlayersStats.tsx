import React from 'react';
import { IGamePlay, IPlayerCurrent } from 'Game';
import PlayerStats from './PlayerStats';

interface IProps {
  gamePlay: IGamePlay;
  player: IPlayerCurrent;
}

const PlayersStats = ({ gamePlay, player }: IProps) => {
  return (
    <div className="flex gap-4">
      <PlayerStats
        playerName={player.playerName || `Player: ${player.playerId}`}
        isPlayerTurn={player.isPlayerTurn}
        cards={player.cards.length}
        isInHand={player.isInHand}
        team={gamePlay.teams[player.teamId]}
      />
      <div className="flex gap-4">
        {gamePlay.otherPlayers.map(player => (
          <div className="flex" key={player.playerId}>
            <PlayerStats
              playerName={player.playerName || `Player: ${player.playerId}`}
              isPlayerTurn={player.isPlayerTurn}
              cards={player.cards}
              isInHand={player.isInHand}
              team={gamePlay.teams[player.teamId]}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayersStats;
