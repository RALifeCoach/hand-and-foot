import { IGamePlay } from "Game";

const endGame = (gamePlay: IGamePlay) => {
  gamePlay.gameState = 'finished'
};

export default endGame;
