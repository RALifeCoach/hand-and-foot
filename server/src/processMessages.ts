import buildPlayerInfo from "./game/utils/buildPlayerInfo";
import socketHandler from "./game/socketHandler";
import { IPlayer, IGameJson, IGameState } from "Game";
import Database from "./Database";
import { IGameController } from "./socketManager";
import startPlaying from "./game/utils/startPlaying";
import { ACTION_RESPONSE } from "../constants";
import uuid from 'uuid';

const processMessages = (
  messageStack: any[],
  gameController: IGameController
) => {
  const data = messageStack[0];

  if (!gameController[data.value.gameId]) {
    gameController[data.value.gameId] = { players: {} };
  }
  gameController[data.value.gameId].players[data.value.playerId] = data.socket;

  const gameId = data.value.gameId;
  const playerId = data.value.playerId;
  console.log(
    "about to process",
    data.type,
    data.value.gameId,
    data.value.playerId
  );

  const sqlGame = `select * from game where gameId = '${data.value.gameId}'`;
  Database.query(sqlGame, (games) => {
    if (games.length !== 1) {
      console.log(sqlGame);
      throw new Error("game does not exist");
    }
    const game: IGameJson = JSON.parse(games[0].GameJson);

    new Promise(resolve => {
      if (ACTION_RESPONSE[data.type].logIt) {
        const logId = uuid.v4();
        const sql = `insert into game_log values ('${logId}'. '${games[0].GameJson}')`;
        Database.exec(sql, (err: Error) => {
          if (err) {
            console.log(err);
            throw err;
          }
          game.transactionLog.push({ canUndo: ACTION_RESPONSE[data.type].canUndo, logId });
          resolve();
        })
      } else {
        if (data.type === 'undo') {
          // TODO
        }
        resolve();
      }
    })
      .then(() => {
        const message = socketHandler(game, data);

        startPlaying(ACTION_RESPONSE[data.type].sendToAll, game, gameController, gameId);
        if (
          ACTION_RESPONSE[data.type].sendToAll &&
          game.gameState === "waitingToReStart" &&
          game.numberOfPlayers ===
          Object.keys(gameController[gameId].players).length
        ) {
          game.gameState = "inPlay";
        }
        const newGameStr = JSON.stringify(game);
        const sql = `update game set GameJson= '${newGameStr}' where GameId = '${data.value.gameId}'`;
        Database.exec(sql, (err: Error | null) => {
          if (err) {
            throw err;
          }
          if (ACTION_RESPONSE[data.type].sendToAll) {
            try {
              (Object.values(game.players) as IPlayer[]).forEach((player) => {
                const playerInfo =
                  message ||
                  JSON.stringify({
                    type: "updateGame",
                    game: buildPlayerInfo(game, gameId, player.playerId),
                  });
                if (gameController[gameId].players[player.playerId]) {
                  gameController[gameId].players[player.playerId].send(playerInfo);
                }
              });
            } catch (ex) {
              console.log(ex);
              console.log("failed to send");
            }
          } else {
            const playerInfo =
              message ||
              JSON.stringify({
                type: "updateGame",
                game: buildPlayerInfo(game, gameId, data.value.playerId),
              });
            gameController[gameId].players[playerId].send(playerInfo);
          }
          messageStack.splice(0, 1);
          if (messageStack.length) {
            processMessages(messageStack, gameController);
          }
        });
      });
  });
};

export default processMessages;
