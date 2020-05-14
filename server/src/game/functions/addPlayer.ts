import { IGamePlay, IPlayer, ITeam, ICard } from "Game";

const addPlayer = (
  gamePlay: IGamePlay,
  playerId: number,
  teamId: string,
  position: number,
) => {
  const player = gamePlay.players[playerId];
  if (player) {
    if (player.teamId !== teamId || player.position !== position) {
      throw new Error(
        "player is already present at a different team or position"
      );
    }
    return null;
  }
  const positionExists = Object.values(gamePlay.players).some(
    (player) => player.position === position
  );
  if (positionExists) {
    throw new Error("that position is already filled");
  }

  gamePlay.players[playerId] = {
    playerId,
    teamId,
    position,
    playerState: "waiting",
    numberOfCardsToDraw: 0,
    hand: [] as ICard[],
    foot: [] as ICard[],
    isInHand: true,
  } as IPlayer;

  if (!gamePlay.teams[teamId]) {
    gamePlay.teams[teamId] = {
      teamId,
      isDown: false,
      melds: {},
    } as ITeam;
  }

  return null;
};

export default addPlayer;
