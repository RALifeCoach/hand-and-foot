import { IGameJson, IMeldType } from "Game";

const addMessageFoot = (game: IGameJson, stillPlaying: boolean) => {
  game.messages.push({
    isSent: false,
    type: "foot",
    playerName: game.players[game.currentPlayerId].playerName,
    text: `went into their foot${stillPlaying ? ' and still playing' : ''}`,
  });
};

export default addMessageFoot;
