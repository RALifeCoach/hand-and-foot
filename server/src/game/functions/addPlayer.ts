import { IGamePlay, IPlayer } from "../../models/game";
import { ITeam, ICard } from "../../../models/game";
import Database from "../../Database";
import logger from "../../util/logger";

const addPlayer = (
  gamePlay: IGamePlay,
  players: IPlayer[],
  playerId: number,
  teamId: string,
  position: number,
  resolve: any
) => {
  const player = players.find(player => player.playerId === playerId);
  if (player) {
    if (player.position !== position) {
      logger.error(`Player is aleady present at a different position (${player.position}, ${position})`);
      throw new Error("player is already present at a different position");
    }
    resolve(null);
  }
  const positionExists = players.some((player) => player.position === position);
  if (positionExists) {
    throw new Error("that position is already filled");
  }

  // now get the player
  const sql = `select * from handf.player where id = ${playerId}`;
  Database.query(sql, (rows) => {
    if (rows.length !== 1) {
      logger.error(`user not found for query ${sql}`);
      throw new Error("user not found");
    }

    players.push({
      playerId,
      teamId,
      position,
      playerName: rows[0].name,
      playerState: "waiting",
      numberOfCardsToDraw: 0,
      numberOfCardsToReplace: 0,
      hand: [] as ICard[],
      foot: [] as ICard[],
      isInHand: true,
    } as IPlayer)

    if (!gamePlay.teams[teamId]) {
      gamePlay.teams[teamId] = {
        teamId,
        isDown: false,
        melds: {},
      } as ITeam;
    }

    resolve(null);
  });
};

export default addPlayer;
