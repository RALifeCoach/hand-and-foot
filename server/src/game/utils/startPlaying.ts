import { IGamePlay, IGameRules } from "Game";
import { IGameController } from "../../socket/socketManager";
import startNewRound from "../functions/startNewRound";

const startPlaying = (
  sendToAll: boolean,
  gamePlay: IGamePlay,
  gameRules: IGameRules,
  gameController: IGameController,
  gameId: number
) => {
  if (!sendToAll || gamePlay.gameState !== "waitingToStart") {
    return;
  }
  const numberOfPlayers = gameRules.numberOfPlayers;
  if (numberOfPlayers !== Object.keys(gameController[gameId].players).length) {
    return;
  }
  if (Object.keys(gamePlay.players).length !== numberOfPlayers) {
    return;
  }
  let currentPlayerIndex = Math.floor(Math.random() * gameRules.numberOfPlayers);
  if (currentPlayerIndex >= gameRules.numberOfPlayers) {
    currentPlayerIndex = 0;
  }
  gamePlay.currentPlayerId = Object.values(gamePlay.players)[
    currentPlayerIndex
  ].playerId;
  gamePlay.gameState = "inPlay";
  startNewRound(gamePlay, gameRules);
};

export default startPlaying;
