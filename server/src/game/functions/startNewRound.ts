import { IGamePlay, IGameRules } from "Game";
import startNewTurn from "./startNewTurn";
import drawCards from "../utils/drawCards";
import dealCards from "./dealCards";

const ROUND_MINIMUM = [50, 90, 120, 150, 190, 220, 250, 290];

const startNewRound = (gamePlay: IGamePlay, gameRules: IGameRules) => {
  gamePlay.deck = dealCards();
  if (gameRules.roundSequence === "random") {
    const unplayedRounds = gamePlay.rounds.filter((round) => !round.played);
    const roundIndex = Math.min(
      Math.floor(Math.random() * unplayedRounds.length),
      unplayedRounds.length - 1
    );
    gamePlay.currentRound = roundIndex;
  } else {
    gamePlay.currentRound = gamePlay.currentRound + 1;
  }
  Object.keys(gamePlay.players).forEach((playerId) => {
    gamePlay.players[playerId].hand = drawCards(gamePlay.deck, 11);
    gamePlay.players[playerId].foot = drawCards(gamePlay.deck, 11);
  });
  gamePlay.minimumPoints = ROUND_MINIMUM[gamePlay.currentRound];
  Object.keys(gamePlay.teams).forEach((teamId) => {
    const team = gamePlay.teams[teamId];
    team.isDown = false;
    team.melds = {};
    team.scoreBase = 0;
    team.scoreCards = 0;
  });
  gamePlay.pickupPiles = [[], [], [], []];
  do {
    const pileIndex = Math.min(Math.floor(Math.random() * 4), 3);
    gamePlay.pickupPiles[pileIndex].push(...drawCards(gamePlay.deck, 1));
  } while (gamePlay.deck.length > 0);

  startNewTurn(gamePlay, gameRules);
};

export default startNewRound;
