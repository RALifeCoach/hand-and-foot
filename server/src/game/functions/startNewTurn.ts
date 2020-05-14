import { IGamePlay, IPlayer, IGameRules } from "Game";

const startNewTurn = (gamePlay: IGamePlay, gameRules: IGameRules) => {
  const currentPlayer = gamePlay.players[gamePlay.currentPlayerId];
  currentPlayer.playerState = "waiting";

  const playerIds = Object.values(gamePlay.players)
    .sort((a: IPlayer, b: IPlayer) => a.position - b.position)
    .map((player) => player.playerId);
  let currentPlayerIndex = playerIds.indexOf(gamePlay.currentPlayerId);
  if (++currentPlayerIndex === gameRules.numberOfPlayers) {
    currentPlayerIndex = 0;
  }
  gamePlay.currentPlayerId = playerIds[currentPlayerIndex];
  const nextPlayer = gamePlay.players[gamePlay.currentPlayerId];
  nextPlayer.playerState = "draw";
  nextPlayer.numberOfCardsToDraw = 2;
};

export default startNewTurn;
