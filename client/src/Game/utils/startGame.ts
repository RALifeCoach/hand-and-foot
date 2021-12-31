export const ROUNDS = [
  {
    roundId: 0,
    minimumScore: 50,
    played: false,
    teams: {},
  },
  {
    roundId: 1,
    minimumScore: 90,
    played: false,
    teams: {},
  },
  {
    roundId: 2,
    minimumScore: 120,
    played: false,
    teams: {},
  },
  {
    roundId: 3,
    minimumScore: 150,
    played: false,
    teams: {},
  },
  {
    roundId: 4,
    minimumScore: 190,
    played: false,
    teams: {},
  },
  {
    roundId: 5,
    minimumScore: 220,
    played: false,
    teams: {},
  },
  {
    roundId: 6,
    minimumScore: 250,
    played: false,
    teams: {},
  },
  {
    roundId: 7,
    minimumScore: 290,
    played: false,
    teams: {},
  },
];

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
      })
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
      });

  return {
    rules: gameRules,
    play: {
      pileIsLocked: true,
      gameState: "waitingToStart",
      currentPlayerId: 0,
      rounds: ROUNDS.slice(0, numberOfRounds),
      currentRound: -1,
      transactionLog: [],
      minimumPoints: 0,
      teams: {},
      messages: [],
      discard: [],
      pickupPiles: [[], [], [], []],
      deck: [],
      toDiscardId: 0,
    },
    players: [],
  };
};

export default startGame;
