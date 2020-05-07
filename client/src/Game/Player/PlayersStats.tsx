import React from 'react';
import FlexRow from "../../shared/flex-grid/FlexRow";
import { IGame, IPlayerCurrent } from 'Game';
import PlayerStats from './PlayerStats';

interface IProps {
  game: IGame;
  player: IPlayerCurrent;
}

const PlayersStats = ({ game, player }: IProps) => {
  return (
    <FlexRow>
      <PlayerStats
        playerName={player.playerName || `Player: ${player.playerId}`}
        isPlayerTurn={player.isPlayerTurn}
        cards={player.cards.length}
        isInHand={player.isInHand}
        team={game.teams[player.teamId]}
      />
      <FlexRow>
        {game.otherPlayers.map(player => (
          <FlexRow key={player.playerId}>
            <PlayerStats
              playerName={player.playerName || `Player: ${player.playerId}`}
              isPlayerTurn={player.isPlayerTurn}
              cards={player.cards}
              isInHand={player.isInHand}
              team={game.teams[player.teamId]}
            />
          </FlexRow>
        ))}
      </FlexRow>
    </FlexRow>
  );
};

export default PlayersStats;
