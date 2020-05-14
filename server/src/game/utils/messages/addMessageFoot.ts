import { IGamePlay } from "Game";

const addMessageFoot = (gamePlay: IGamePlay, stillPlaying: boolean) => {
  gamePlay.messages.push({
    isSent: false,
    type: "foot",
    playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
    text: `went into their foot${stillPlaying ? ' and still playing' : ''}`,
  });
};

export default addMessageFoot;
