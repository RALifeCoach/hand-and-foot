import { ICard } from "../../queries/game";
import {useRecoilValue} from 'recoil'
import {selectedAtom} from '../../atoms/game'

const useSelectedCards = (cards: ICard[]) => {
  const selected = useRecoilValue(selectedAtom) as { [cardId: string]: boolean }

  return cards.filter(card => selected[card.cardId]);
};

export default useSelectedCards;
