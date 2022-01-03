import {IGamePlay, IPlayer} from '../../../models/game'
import getCurrentPlayer from '../../functions/getCurrentPlayer'

const addMessageFoot = (gamePlay: IGamePlay, players: IPlayer[], stillPlaying: boolean) => {
  const player = getCurrentPlayer(gamePlay, players)

  gamePlay.messages.push({
    isSent: false,
    type: "foot",
    playerName: player.playerName,
    text: `went into their foot${stillPlaying ? ' and still playing' : ''}`,
  });
};

export default addMessageFoot;
