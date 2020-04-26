import {IGameJson, IPlayer, IPlayerCurrent, IPlayerInfo, IPlayerOther} from "Game";

const buildPlayerInfo = (game: IGameJson, playerId: number): IPlayerInfo => {
  const currentPlayer = game.players[playerId];
  return {
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
          } as IPlayerOther)
      ),
    teams: game.teams,
  } as IPlayerInfo;
}

export default buildPlayerInfo;
