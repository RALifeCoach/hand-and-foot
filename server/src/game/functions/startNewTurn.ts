import { IGamePlay, IPlayer } from "../../models/game";
import { IGameBase } from "../../../../models/game";

const startNewTurn = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[]) => {
  console.log('start new turn')
  const currentPlayer = players[gamePlay.currentPlayerIndex];
  currentPlayer.playerState = "waiting";

  const position = Math.min(currentPlayer.position + 1, players.length - 1)
  const nextPlayerIndex = players.findIndex(player => player.position === position)
  if (nextPlayerIndex === -1) {
    throw new Error('player not found')
  }

  gamePlay.currentPlayerIndex = nextPlayerIndex;
  const nextPlayer = players[nextPlayerIndex]
  nextPlayer.playerState = "draw";
  nextPlayer.numberOfCardsToDraw = 2;
  nextPlayer.numberOfCardsToReplace = 0;
};

export default startNewTurn;
