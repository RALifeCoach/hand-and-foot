import {IGamePlay, IPlayer, IPlayerCurrent, IPlayerInfo, IPlayerOther} from '../../models/game'
import {
  IMessage,
  IGameBase
} from '../../../models/game'
import isWildCard from './isWildCard'

const buildPlayerInfo = (
  gamePlay: IGamePlay,
  gameRules: IGameBase,
  players: IPlayer[],
  gameId: number,
  playerId: number,
  messages: IMessage[],
  isCurrentPlayer: boolean,
): IPlayerInfo => {
  const activePlayer = players.find(player => player.playerId === gamePlay.currentPlayerId)
  const currentPlayer = players.find(player => player.playerId === playerId)
  if (!currentPlayer) {
    throw new Error(`player not found (${playerId})`)
  }

  return {
    gameId,
    gameState: gamePlay.gameState,
    currentPlayer: {
      playerId: currentPlayer.playerId,
      playerName: currentPlayer.playerName,
      playerState: currentPlayer.playerState,
      cards: currentPlayer.isInHand ? currentPlayer.hand : currentPlayer.foot,
      isPlayerTurn: currentPlayer.playerId === activePlayer?.playerId,
      numberOfCardsToDraw: currentPlayer.numberOfCardsToDraw,
      numberOfCardsToReplace: currentPlayer.numberOfCardsToReplace,
      isInHand: currentPlayer.isInHand,
      sortOrder: currentPlayer.sortOrder,
      teamId: currentPlayer.teamId,
    } as IPlayerCurrent,
    otherPlayers: (players as IPlayer[])
      .filter((player) => player.playerId !== playerId)
      .sort((playerA, playerB) => {
        const positionA =
          (playerA.position + gameRules.numberOfPlayers - currentPlayer.position) %
          gameRules.numberOfPlayers
        const positionB =
          (playerB.position + gameRules.numberOfPlayers - currentPlayer.position) %
          gameRules.numberOfPlayers
        return positionA - positionB
      })
      .map(
        (player: IPlayer) =>
          ({
            playerId: player.playerId,
            playerName: player.playerName,
            playerState: player.playerState,
            cards: player.isInHand ? player.hand.length : player.foot.length,
            isPlayerTurn: player.playerId === activePlayer?.playerId,
            isInHand: player.isInHand,
            teamId: player.teamId,
          } as IPlayerOther)
      ),
    teams: gamePlay.teams,
    discardCard: gamePlay.discard.length > 0 ? gamePlay.discard[0] : null,
    discardCount: gamePlay.discard.length,
    pickupPiles: gamePlay.pickupPiles.map((pile) => pile.length),
    pileIsLocked: gamePlay.discard.some((card) => isWildCard(card)),
    minimumPoints: gamePlay.minimumPoints,
    messages: isCurrentPlayer ? messages : [],
  } as IPlayerInfo
}

export default buildPlayerInfo
