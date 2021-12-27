import { IGamePlay } from "Game";
import { gamePlayAtom, sortOrderAtom } from "../game";

const sortOrder = (set: any, message: any) => {
  set(sortOrderAtom, message.value.sortOrder);
  set(gamePlayAtom, (gamePlay: IGamePlay) => {
    if (!gamePlay) {
      throw new Error("No game play");
    }
    const newGamePlay = { ...gamePlay };
    newGamePlay.currentPlayer = { ...gamePlay.currentPlayer };
    newGamePlay.currentPlayer.cards = message.value.cards;
    return newGamePlay;
  });
};

export default sortOrder;
