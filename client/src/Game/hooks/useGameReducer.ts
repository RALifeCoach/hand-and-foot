import { useReducer } from "react";
import useSelectCard from "./useSelectCard";
import { IAction } from "General";
import { IGameContextState } from "../GameContext";
import { ReadyState } from "react-use-websocket";

const useGameReducer = (gameId: number, playerId: number) => {
  const selectCard = useSelectCard();
  return useReducer(
    (state: IGameContextState, action: IAction) => {
      switch (action.type) {
        case "setReadyState":
          return { ...state, readyState: action.value };
        case "sendMessage":
          if (
            state.readyState !== ReadyState.OPEN ||
            state.savedMessages.length
          ) {
            return {
              ...state,
              savedMessages: [
                ...state.savedMessages,
                JSON.stringify(action.value),
              ],
            };
          }
          return { ...state, currentMessage: JSON.stringify(action.value) };
        case "popMessage":
          const [nextMessage, ...rest] = state.savedMessages;
          return { ...state, currentMessage: nextMessage, savedMessages: rest };
        case "clearMessage":
          return { ...state, currentMessage: null };
        case "cardMoving":
          return { ...state, cardMoving: action.value };
        case "select":
          if (state.cardMoving) {
            const message = {
              type: "moveCard",
              value: {
                gameId,
                playerId,
                movingCardId: state.cardMoving.cardId,
                destCardId: action.value.cardId,
              },
            };
            if (
              state.readyState !== ReadyState.OPEN ||
              state.savedMessages.length
            ) {
              return {
                ...state,
                savedMessages: [
                  ...state.savedMessages,
                  JSON.stringify(message),
                ],
              };
            }
            return { ...state, currentMessage: JSON.stringify(message) };
          }
          return {
            ...state,
            selected: selectCard(state.selected, action.value),
          };
        case "setLastMessage":
          const message = action.value;
          switch (message.type) {
            case "updateGame":
              return {
                ...state,
                lastMessage: action.value,
                game: message.game,
                cards: message.game.currentPlayer.cards,
                sortOrder: message.game.currentPlayer.sortOrder,
              };
            case "sortOrder":
              const newSortOrder = message.value.sortOrder;
              return {
                ...state,
                sortOrder: newSortOrder,
                cards: message.value.cards,
              };
            case "moveCard":
              return { ...state, cardMoving: null, cards: message.value.cards };
            case "pinCard":
              return { ...state, cards: message.value.cards };
            default:
              debugger;
              throw new Error(`unknown message type ${action.value.type}`);
          }
        default:
          return state;
      }
    },
    {
      lastMessage: null,
      readyState: null,
      savedMessages: [],
      currentMessage: null,
      game: null,
      selected: {},
      sortOrder: "",
      cardMoving: null,
    } as IGameContextState
  );
};

export default useGameReducer;
