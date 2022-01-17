import {IGamePlay, IPlayer} from '../../models/game'
import { IGameBase } from "../../../models/game";
import { IGameController } from "../../socket/socketManager";
import startNewRound from "../functions/startNewRound";

const startPlaying = (
  sendToAll: boolean,
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
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
  if (players.length !== numberOfPlayers) {
    return;
  }
  let currentPlayerIndex = Math.floor(Math.random() * gameRules.numberOfPlayers);
  if (currentPlayerIndex >= gameRules.numberOfPlayers) {
    currentPlayerIndex = 0;
  }
  const player = players[currentPlayerIndex]
  gamePlay.currentPlayerId = player.playerId
  gamePlay.roundStartPlayerId = player.playerId
  gamePlay.gameState = "inPlay";
  startNewRound(gamePlay, gameRules, players);
};

export default startPlaying;
