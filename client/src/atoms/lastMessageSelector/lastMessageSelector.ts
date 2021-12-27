import { selector } from "recoil";
import {
  errorAtom,
  lastMessageAtom,
  selectedAtom,
  serverQuestionAtom,
} from "../game";
import moveCard from "./moveCard";
import pinCard from "./pinCard";
import sortOrder from "./sortOrder";
import updateGame from "./updateGame";

export const lastMessageSelector = selector<any>({
  key: "lastMessageSelector",
  get: ({ get }) => get(lastMessageAtom),
  set: ({ get, set }, message) => {
    const selected = get(selectedAtom);
    switch (message.type) {
      case "updateGame":
        updateGame(get, set, message);
        return;
      case "sortOrder":
        sortOrder(set, message);
        return;
      case "serverQuestion":
        set(serverQuestionAtom, message.value);
        return;
      case "moveCard":
        moveCard(set, message);
        return;
      case "pinCard":
        pinCard(set, message);
        return;
      case "unmetMin":
        set(errorAtom, "You do not have enough points on the board to go down");
        return;
      case "cannotUndo":
        if (Object.keys(selected).length > 0) {
          set(selectedAtom, {});
        }
        set(errorAtom, "There is nothing to undo");
        return;
      default:
        debugger;
        throw new Error(`unknown message type ${message.value.type}`);
    }
  },
});
