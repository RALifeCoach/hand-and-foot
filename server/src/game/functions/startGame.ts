import { IGameJson } from "Game";
import { ROUNDS } from "../../../constants";

const startGame = (numberOfPlayers: number) => {
  const numberOfRounds = 7;
  return Number(numberOfPlayers) === 4
    ? ({
        pileIsLocked: false,
        gameState: "waitingToStart",
        numberOfPlayers: Number(numberOfPlayers),
        currentPlayerId: 0,
        numberOfRounds: numberOfRounds,
        rounds: ROUNDS.slice(0, numberOfRounds),
        roundSequence: "sequential",
        currentRound: -1,
        transactionLog: [],
        minimumPoints: 0,
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
        players: {},
        teams: {},
        messages: [],
        discard: [],
        pickupPiles: [[], [], [], []],
        deck: [],
      } as IGameJson)
    : ({
        pileIsLocked: false,
        gameState: "waitingToStart",
        numberOfPlayers: Number(numberOfPlayers),
        currentPlayerId: 0,
        numberOfRounds: numberOfRounds,
        rounds: ROUNDS.slice(0, numberOfRounds),
        roundSequence: "random",
        currentRound: -1,
        transactionLog: [],
        minimumPoints: 0,
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
        messages: [],
        players: {},
        teams: {},
        discard: [],
        deck: [],
        pickupPiles: [[], [], [], []],
      } as IGameJson);
};

export default startGame;
