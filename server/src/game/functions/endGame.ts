import { IGamePlay } from "../../models/game";

const endGame = (gamePlay: IGamePlay) => {
  console.log('end game')
  gamePlay.gameState = 'finished'
};

export default endGame;
