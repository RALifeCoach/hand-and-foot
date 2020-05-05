import { IGameJson, IPlayer, ITeam, ICard } from "Game";

const addPlayer = (
  game: IGameJson,
  playerId: number,
  teamId: string,
  position: number,
) => {
  const player = game.players[playerId];
  if (player) {
    if (player.teamId !== teamId || player.position !== position) {
      throw new Error(
        "player is already present at a different team or position"
      );
    }
    return null;
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
    playerState: "waiting",
    numberOfCardsToDraw: 0,
    hand: [] as ICard[],
    foot: [] as ICard[],
    isInHand: true,
  } as IPlayer;

  if (!game.teams[teamId]) {
    game.teams[teamId] = {
      teamId,
      isDown: false,
      melds: {},
    } as ITeam;
  }

  return null;
};

export default addPlayer;
