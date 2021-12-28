import { cardMovingAtom, gamePlayAtom, selectedAtom } from "../game";
import {GetRecoilValue, SetRecoilState} from 'recoil'

const moveCard = (get: GetRecoilValue, set: SetRecoilState, message: any) => {
  const gamePlay = get(gamePlayAtom)
  if (!gamePlay) {
    throw new Error("No game play");
  }
  const newGamePlay = { ...gamePlay };
  newGamePlay.currentPlayer = { ...gamePlay.currentPlayer };
  newGamePlay.currentPlayer.cards = message.value.cards;
  set(gamePlayAtom, newGamePlay);
  set(cardMovingAtom, null);
  set(selectedAtom, {});
};

export default moveCard;
