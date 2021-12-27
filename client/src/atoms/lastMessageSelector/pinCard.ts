import { IGamePlay } from "Game";
import { gamePlayAtom, selectedAtom } from "../game";

const pinCard = (set: any, message: any) => {
  set(gamePlayAtom, (gamePlay: IGamePlay) => {
    if (!gamePlay) {
      throw new Error("No game play");
    }
    const newGamePlay = { ...gamePlay };
    newGamePlay.currentPlayer = { ...gamePlay.currentPlayer };
    newGamePlay.currentPlayer.cards = message.value.cards;
    return newGamePlay;
  });
  set(selectedAtom, {});
};

export default pinCard;
