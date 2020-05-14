import { IGamePlay, ICard } from "Game";

const addMessageDraw7 = (gamePlay: IGamePlay, card: ICard) => {
  gamePlay.messages.push({
    isSent: false,
    type: "draw7",
    playerName: gamePlay.players[gamePlay.currentPlayerId].playerName,
    text: `drew the ${card.suit}-${card.rank}`,
  });
};

export default addMessageDraw7;
