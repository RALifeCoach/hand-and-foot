import {IGamePlay, IPlayer} from '../../../models/game'

const addMessageFoot = (gamePlay: IGamePlay, players: IPlayer[], stillPlaying: boolean) => {
  gamePlay.messages.push({
    isSent: false,
    type: "foot",
    playerName: players[gamePlay.currentPlayerIndex].playerName,
    text: `went into their foot${stillPlaying ? ' and still playing' : ''}`,
  });
};

export default addMessageFoot;
