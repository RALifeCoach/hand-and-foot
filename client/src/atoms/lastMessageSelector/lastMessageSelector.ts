import {GetRecoilValue, selector, SetRecoilState} from 'recoil'
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

const COMMANDS = {
  updateGame: updateGame,
  sortOrder: sortOrder,
  moveCard: moveCard,
  pinCard: pinCard,
} as {[key: string]: (get: GetRecoilValue, set: SetRecoilState, message: any) => void}

export const lastMessageSelector = selector<any>({
  key: "lastMessageSelector",
  get: ({ get }) => get(lastMessageAtom),
  set: ({ get, set }, message) => {
    const selected = get(selectedAtom);
    const command = COMMANDS[message.type as string]
    if (command) {
      command(get, set, message)
      return
    }
    switch (message.type) {
      case "error":
        console.log(message.message)
        return;
      case "serverQuestion":
        set(serverQuestionAtom, message.value);
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
