import { gamePlayAtom, sortOrderAtom } from "../game";
import {GetRecoilValue, SetRecoilState} from 'recoil'

const sortOrder = (get: GetRecoilValue, set: SetRecoilState, message: any) => {
  const gamePlay = get(gamePlayAtom)
  set(sortOrderAtom, message.value.sortOrder);
  if (!gamePlay) {
    throw new Error("No game play");
  }
  const newGamePlay = { ...gamePlay };
  newGamePlay.currentPlayer = { ...gamePlay.currentPlayer };
  newGamePlay.currentPlayer.cards = message.value.cards;
  set(gamePlayAtom, newGamePlay);
};

export default sortOrder;
