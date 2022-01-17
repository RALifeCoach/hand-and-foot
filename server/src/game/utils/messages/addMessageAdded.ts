import {IGamePlay, IPlayer} from '../../../models/game'
import { IMeldType, ICard } from "../../../../models/game";
import getMessageTypeText from "./getMessageTypeText";
import getCurrentPlayer from '../../functions/getCurrentPlayer'

const addMessageAdded = (
  gamePlay: IGamePlay,
  players: IPlayer[],
  type: IMeldType,
  cards: ICard[]
) => {
  const player = getCurrentPlayer(gamePlay, players)

  if (type === "3s") {
    gamePlay.messages.push({
      isSent: false,
      type: "added",
      playerName: player.playerName,
      text: `added ${cards.length} ${getMessageTypeText(type)}${
        cards.length > 1 ? "s" : ""
      }`,
    });
    return;
  }
  const cardDisplays = cards
    .map((card) => {
      return card.suit === "J" ? "*" : `${card.suit}-${card.rank}`;
    })
    .join(", ");
  gamePlay.messages.push({
    isSent: false,
    type: "added",
    playerName: player.playerName,
    text: `added ${cardDisplays} to a ${getMessageTypeText(type)}`,
  });
};

export default addMessageAdded;
