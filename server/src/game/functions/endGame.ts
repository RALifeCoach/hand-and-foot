import { IGamePlay } from "../../models/game";

const endGame = (gamePlay: IGamePlay) => {
  gamePlay.gameState = 'finished'
};

export default endGame;
