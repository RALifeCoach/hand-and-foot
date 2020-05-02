import { IMeldType, IRank } from "Game";
import { ICardMapping } from "./mapCards";

const canPlay3s = (
  mapping: ICardMapping,
  redThreeScore: number
): { meldType?: IMeldType; meldRank?: IRank; error: string } | null => {
  // if there are 3's and anything else then not okay
  if (mapping.others.wild || Object.keys(mapping.suits).length) {
    return null;
  }
    // if there are both red and black 3's not okay
  if (mapping.others.red3 && mapping.others.black3) {
    return null;
  }

  if (mapping.others.red3) {
    return redThreeScore > 0 ? { meldType: "3s", error: "" } : null;
  }

  // black 3's
  // TODO - this is valid on final discard
  return null;
};

export default canPlay3s;
