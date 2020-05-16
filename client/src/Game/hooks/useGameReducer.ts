import { useReducer } from "react";
import useSelectCard from "./useSelectCard";
import { IAction } from "General";
import { IGameContextState } from "../GameContext";
import { ReadyState } from "react-use-websocket";
import { ICard } from "Game";

const useGameReducer = (gameId: number, user: any, playerId: number) => {
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
          const card: ICard = action.value;
          if (card.isFromPile) {
            return {
              ...state,
              error: "You cannot deselect the card drawn from the pile",
            };
          }
          return {
            ...state,
            selected: selectCard(state.selected, action.value),
          };
        case "clearError":
          return { ...state, error: "" };
        case "messagesSeen":
          return { ...state, newMessages: false };
        case "gameBase":
          return { ...state, gameBase: action.value };
        case "setLastMessage":
          const message = action.value;
          switch (message.type) {
            case "updateGame":
              if (message.messageId === state.messageId) {
                return state;
              }
              const newMessages =
                message.game.gameState === "inPlay"
                  ? message.game.messages
                  : [];
              const currentPlayer = message.game.currentPlayer;
              const newSelected = { ...state.selected };
              if (currentPlayer.playerState === "draw7") {
                debugger;
                const drawnCard = currentPlayer.cards.find(
                  (card: ICard) => card.isFromPile
                );
                if (drawnCard) {
                  newSelected[drawnCard.cardId] = true;
                }
              }
              return {
                ...state,
                lastMessage: action.value,
                gamePlay: message.game,
                sortOrder: currentPlayer.sortOrder,
                messages: [...state.messages, ...newMessages],
                newMessages: state.newMessages || newMessages.length > 0,
                messageId: message.messageId,
                selected: newSelected,
              };
            case "sortOrder":
              const newSortOrder = message.value.sortOrder;
              return {
                ...state,
                sortOrder: newSortOrder,
                gamePlay: {
                  ...state.gamePlay,
                  currentPlayer: {
                    ...state?.gamePlay?.currentPlayer,
                    cards: message.value.cards,
                  },
                },
              };
            case "moveCard":
              return {
                ...state,
                gamePlay: {
                  ...state.gamePlay,
                  currentPlayer: {
                    ...state?.gamePlay?.currentPlayer,
                    cards: message.value.cards,
                  },
                },
                cardMoving: null,
                selected: {},
              };
            case "pinCard":
              return {
                ...state,
                gamePlay: {
                  ...state.gamePlay,
                  currentPlayer: {
                    ...state?.gamePlay?.currentPlayer,
                    cards: message.value.cards,
                  },
                },
                selected: {},
              };
            case "unmetMin":
              return {
                ...state,
                error: "You do not have enough points on the board to go down",
              };
            case "cannotUndo":
              if (Object.keys(state.selected).length > 0) {
                return {
                  ...state,
                  selected: {},
                };
              }
              return {
                ...state,
                error: "There is nothing to undo",
              };
            default:
              debugger;
              throw new Error(`unknown message type ${action.value.type}`);
          }
        default:
          throw new Error("Unknown action type");
      }
    },
    {
      lastMessage: null,
      readyState: null,
      savedMessages: [],
      currentMessage: null,
      messages: [],
      newMessages: false,
      gameBase: null,
      gamePlay: null,
      selected: {},
      sortOrder: "",
      cardMoving: null,
      error: "",
      messageId: "",
      playerId,
    } as IGameContextState
  );
};

export default useGameReducer;
