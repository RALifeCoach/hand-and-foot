import { IGameJson, ICard } from "Game";

const addMessageDraw7 = (game: IGameJson, card: ICard) => {
  game.messages.push({
    isSent: false,
    type: "draw7",
    playerName: game.players[game.currentPlayerId].playerName,
    text: `drew the ${card.suit}-${card.rank}`,
  });
};

export default addMessageDraw7;
