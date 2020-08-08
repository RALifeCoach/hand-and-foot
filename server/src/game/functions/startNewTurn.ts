import { IGamePlay, IPlayer, IGameRules } from "Game";

const startNewTurn = (gamePlay: IGamePlay, gameRules: IGameRules) => {
  console.debug("start new turn");
  const currentPlayer = gamePlay.players[gamePlay.currentPlayerId];
  currentPlayer.playerState = "waiting";

  const playerIds = Object.values(gamePlay.players)
    .sort((a: IPlayer, b: IPlayer) => a.position - b.position)
    .map((player) => player.playerId);

  const currentPlayerIndex = playerIds.indexOf(gamePlay.currentPlayerId);
  const nextPlayerIndex =
    currentPlayerIndex === gameRules.numberOfPlayers - 1
      ? 0
      : currentPlayerIndex + 1;
  gamePlay.currentPlayerId = playerIds[nextPlayerIndex];
  const nextPlayer = gamePlay.players[gamePlay.currentPlayerId];
  nextPlayer.playerState = "draw";
  nextPlayer.numberOfCardsToDraw = 2;
};

export default startNewTurn;
