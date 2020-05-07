import {
  IGameJson,
  IPlayer,
  IPlayerCurrent,
  IPlayerInfo,
  IPlayerOther,
  IMessage,
} from "Game";
import isWildCard from "./isWildCard";

const buildPlayerInfo = (
  game: IGameJson,
  gameId: number,
  playerId: number,
  messages: IMessage[],
  isCurrentPlayer: boolean,
): IPlayerInfo => {
  const currentPlayer = game.players[playerId];
  return {
    gameId,
    gameState: game.gameState,
    currentPlayer: {
      playerId: currentPlayer.playerId,
      playerName: currentPlayer.playerName,
      playerState: currentPlayer.playerState,
      cards: currentPlayer.isInHand ? currentPlayer.hand : currentPlayer.foot,
      isPlayerTurn: game.currentPlayerId === currentPlayer.playerId,
      numberOfCardsToDraw: currentPlayer.numberOfCardsToDraw,
      isInHand: currentPlayer.isInHand,
      sortOrder: currentPlayer.sortOrder,
      teamId: currentPlayer.teamId,
    } as IPlayerCurrent,
    otherPlayers: (Object.values(game.players) as IPlayer[])
      .filter((player) => player.playerId !== playerId)
      .sort((playerA, playerB) => {
        const positionA =
          (playerA.position + game.numberOfPlayers - currentPlayer.position) %
          game.numberOfPlayers;
        const positionB =
          (playerB.position + game.numberOfPlayers - currentPlayer.position) %
          game.numberOfPlayers;
        return positionA - positionB;
      })
      .map(
        (player: IPlayer) =>
          ({
            playerId: player.playerId,
            playerName: player.playerName,
            playerState: player.playerState,
            cards: player.isInHand ? player.hand.length : player.foot.length,
            isPlayerTurn: game.currentPlayerId === player.playerId,
            isInHand: player.isInHand,
            teamId: player.teamId,
          } as IPlayerOther)
      ),
    teams: game.teams,
    discardCard: game.discard.length > 0 ? game.discard[0] : null,
    discardCount: game.discard.length,
    pickupPiles: game.pickupPiles.map((pile) => pile.length),
    pileIsLocked: game.discard.some((card) => isWildCard(card)),
    minimumPoints: game.minimumPoints,
    canPickupWithWild: game.canPickupWithWild,
    canLockDiscards: game.canLockDiscards,
    canOverFillMeld: game.canOverFillMeld,
    redThreeScore: game.redThreeScore,
    wildCardMeldScore: game.wildCardMeldScore,
    messages: isCurrentPlayer ? messages : [],
  } as IPlayerInfo;
};

export default buildPlayerInfo;
