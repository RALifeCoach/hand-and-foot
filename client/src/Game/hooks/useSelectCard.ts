import { useCallback } from "react";
import { ICard } from "../../../models/game";

const useSelectCard = () =>
  useCallback((selected: { [cardId: string]: boolean }, card: ICard) => {
    const newSelected = { ...selected };
    newSelected[card.cardId] = !Boolean(newSelected[card.cardId]);
    return newSelected;
  }, []);

export default useSelectCard;
