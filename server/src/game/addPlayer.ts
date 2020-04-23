import {IGame, IPlayer, ITeam} from "Game";
import drawCards from "./drawCards";
import * as WebSocket from "ws";

const addPlayer = (game: IGame, playerId: string, teamId: string, position: number): boolean => {
  const player = game.players[playerId];
  if (player) {
    if (player.teamId !== teamId || player.position !== position) {
      throw new Error('player is already present at a different team or position');
    }
    return true;
  }
  const positionExists = Object.values(game.players).some(player => player.position === position);
  if (positionExists) {
    throw new Error('that position is already filled');
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
      }
    } as ITeam;
  }

  return true;
}

export default addPlayer;
