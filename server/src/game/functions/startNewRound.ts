import {IGamePlay, IPlayer} from '../../models/game'
import {IGameBase} from '../../../../models/game'
import startNewTurn from './startNewTurn'
import drawCards from '../utils/drawCards'
import dealCards from './dealCards'

const ROUND_MINIMUM = [50, 90, 120, 150, 190, 220, 250, 290];

const startNewRound = (gamePlay: IGamePlay, gameRules: IGameBase, players: IPlayer[]) => {
  console.debug("start new round");
  gamePlay.deck = dealCards();
  if (gameRules.roundSequence === "random") {
    const unplayedRounds = gamePlay.rounds.filter((round) => !round.played);
    gamePlay.currentRound = Math.min(
      Math.floor(Math.random() * unplayedRounds.length),
      unplayedRounds.length - 1
    );
  } else {
    gamePlay.currentRound = gamePlay.currentRound + 1;
  }
  players.forEach((player) => {
    player.hand = drawCards(gamePlay.deck, 11);
    player.foot = drawCards(gamePlay.deck, 11);
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

  startNewTurn(gamePlay, gameRules, players);
};

export default startNewRound;
