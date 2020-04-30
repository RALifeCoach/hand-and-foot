import { IGameJson, IPlayer } from "Game";

const startNewTurn = (game: IGameJson) => {
  const currentPlayer = game.players[game.currentPlayerId];
  currentPlayer.playerState = "waiting";

  const playerIds = Object.values(game.players)
    .sort((a: IPlayer, b: IPlayer) => a.position - b.position)
    .map((player) => player.playerId);
  let currentPlayerIndex = playerIds.indexOf(game.currentPlayerId);
  if (++currentPlayerIndex === game.numberOfPlayers) {
    currentPlayerIndex = 0;
  }
  game.currentPlayerId = playerIds[currentPlayerIndex];
  const nextPlayer = game.players[game.currentPlayerId];
  nextPlayer.playerState = "draw";
  nextPlayer.numberOfCardsToDraw = 2;
};

export default startNewTurn;
