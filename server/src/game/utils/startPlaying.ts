import { IGameJson } from "Game";
import { IGameController } from "../../socket/socketManager";
import startNewRound from "../functions/startNewRound";

const startPlaying = (
  sendToAll: boolean,
  game: IGameJson,
  gameController: IGameController,
  gameId: number
) => {
  if (!sendToAll || game.gameState !== "waitingToStart") {
    return;
  }
  const numberOfPlayers = game.numberOfPlayers;
  if (numberOfPlayers !== Object.keys(gameController[gameId].players).length) {
    return;
  }
  if (Object.keys(game.players).length !== numberOfPlayers) {
    return;
  }
  let currentPlayerIndex = Math.floor(Math.random() * game.numberOfPlayers);
  console.log("index", currentPlayerIndex);
  if (currentPlayerIndex >= game.numberOfPlayers) {
    currentPlayerIndex = 0;
  }
  game.currentPlayerId = Object.values(game.players)[
    currentPlayerIndex
  ].playerId;
  game.gameState = "inPlay";
  startNewRound(game);
};

export default startPlaying;
