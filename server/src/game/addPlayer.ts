import { IGameJson, IPlayer, ITeam } from "Game";
import drawCards from "./drawCards";

const addPlayer = (
  game: IGameJson,
  playerId: number,
  teamId: string,
  position: number
): { sendToAll: boolean; message: string } => {
  const player = game.players[playerId];
  if (player) {
    if (player.teamId !== teamId || player.position !== position) {
      throw new Error(
        "player is already present at a different team or position"
      );
    }
    return { sendToAll: true, message: '' };
  }
  const positionExists = Object.values(game.players).some(
    (player) => player.position === position
  );
  if (positionExists) {
    throw new Error("that position is already filled");
  }

  game.players[playerId] = {
    playerId,
    teamId,
    position,
    hand: drawCards(game.deck, 11),
    foot: drawCards(game.deck, 11),
    isInHand: true,
  } as IPlayer;

  if (!game.teams[teamId]) {
    game.teams[teamId] = {
      teamId,
      melds: {
        redThrees: 0,
        cleanMelds: [],
        dirtyMelds: [],
        runs: [],
        wildCards: [],
      },
    } as ITeam;
  }

  return { sendToAll: true, message: '' };
};

export default addPlayer;
