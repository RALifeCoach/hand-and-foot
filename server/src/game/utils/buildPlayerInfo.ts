import {IGameJson, IPlayer, IPlayerCurrent, IPlayerInfo, IPlayerOther} from "Game";
import GameValidate from "../GameValidate";
import isWildCard from "./isWildCard";

const buildPlayerInfo = (game: IGameJson, gameId: number, playerId: number): IPlayerInfo => {
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
          (playerA.position + currentPlayer.position) %
          Object.keys(game.players).length;
        const positionB =
          (playerB.position + currentPlayer.position) %
          Object.keys(game.players).length;
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
    deckCount: game.deck.length,
    pileIdLocked: game.discard.some(card => isWildCard(card)),
  } as IPlayerInfo;
}

export default buildPlayerInfo;
