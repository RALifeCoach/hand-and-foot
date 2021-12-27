import { IGamePlay } from "Game";
import { cardMovingAtom, gamePlayAtom, selectedAtom } from "../game";

const moveCard = (set: any, message: any) => {
  set(gamePlayAtom, (gamePlay: IGamePlay) => {
    if (!gamePlay) {
      throw new Error("No game play");
    }
    const newGamePlay = { ...gamePlay };
    newGamePlay.currentPlayer = { ...gamePlay.currentPlayer };
    newGamePlay.currentPlayer.cards = message.value.cards;
    return newGamePlay;
  });
  set(cardMovingAtom, null);
  set(selectedAtom, {});
};

export default moveCard;
