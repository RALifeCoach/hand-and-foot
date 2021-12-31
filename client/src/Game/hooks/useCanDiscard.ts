import { IGameBase } from "../../queries/game";
import { IGamePlay } from "Game";
import useSelectedCards from "./useSelectedCards";
import canDiscard from "../functions/canDiscard";
import { useCallback } from "react";
import {useRecoilValue} from 'recoil'
import {gameBaseAtom, gamePlayAtom} from '../../atoms/game'

const useCanDiscard = () => {
  const gamePlay = useRecoilValue(gamePlayAtom) as IGamePlay
  const gameBase = useRecoilValue(gameBaseAtom) as IGameBase
  const cards = useSelectedCards(gamePlay.currentPlayer.cards);
  return useCallback(() => {
    if (
      gamePlay.gameState !== "inPlay" ||
      gamePlay.currentPlayer.playerState !== "playing" ||
      cards.length !== 1
    ) {
      return "You cannot discard at this point in time";
    }

    return canDiscard(gamePlay, gameBase, cards[0]);
  }, [gamePlay, gameBase, cards])
};

export default useCanDiscard;
