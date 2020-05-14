import { IGame, IGameRules, IGamePlay } from "Game";
import { ROUNDS } from "../../../constants";

const startGame = (numberOfPlayers: number) => {
  const numberOfRounds = 7;
  const gameRules =
    Number(numberOfPlayers) === 4
      ? ({
          numberOfPlayers: 4,
          numberOfRounds: numberOfRounds,
          roundSequence: "sequential",
          canOverFillMeld: false,
          redThreeScore: 100,
          wildCardMeldScore: 1000,
          runScore: 2000,
          cleanScore: 500,
          dirtyScore: 300,
          canPickupWithWild: true,
          canLockDiscards: true,
          askRoundEnd: true,
          canDraw7: true,
          minimumRoundNatural7: 4,
        } as IGameRules)
      : ({
          numberOfPlayers: 3,
          numberOfRounds: numberOfRounds,
          roundSequence: "random",
          canOverFillMeld: true,
          redThreeScore: -500,
          wildCardMeldScore: 500,
          runScore: 1000,
          cleanScore: 300,
          dirtyScore: 100,
          canPickupWithWild: false,
          canLockDiscards: false,
          askRoundEnd: false,
          canDraw7: true,
          minimumRoundNatural7: 4,
        } as IGameRules);

  return {
    GameId: 0,
    GameName: "",
    GameRules: gameRules,
    GamePlay: {
      pileIsLocked: true,
      gameState: "waitingToStart",
      currentPlayerId: 0,
      rounds: ROUNDS.slice(0, numberOfRounds),
      currentRound: -1,
      transactionLog: [],
      minimumPoints: 0,
      players: {},
      teams: {},
      messages: [],
      discard: [],
      pickupPiles: [[], [], [], []],
      deck: [],
    } as IGamePlay,
  } as IGame;
};

export default startGame;
