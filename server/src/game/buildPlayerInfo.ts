import {IGame, IPlayer, IPlayerCurrent, IPlayerInfo, IPlayerOther} from "Game";

const buildPlayerInfo = (game: IGame, playerId: string): IPlayerInfo => {
  const currentPlayer = game.players[playerId];
  return {
    currentPlayer: {
      cards: currentPlayer.isInHand ? currentPlayer.hand : currentPlayer.foot,
      isPlayerTurn: false,
      isInHand: currentPlayer.isInHand,
    } as IPlayerCurrent,
    otherPlayers: (Object.values(game.players) as IPlayer[])
      .filter(player => player.playerId !== playerId)
      .sort((playerA, playerB) => {
        const positionA = (playerA.position + currentPlayer.position) % Object.keys(game.players).length;
        const positionB = (playerB.position + currentPlayer.position) % Object.keys(game.players).length;
        return positionA - positionB;
      })
      .map((player: IPlayer) => (
        {
          cards: player.isInHand ? player.hand.length : player.foot.length,
          isPlayerTurn: false,
          isInHand: player.isInHand,
        } as IPlayerOther
      )),
    teams: game.teams,
  } as IPlayerInfo;
}

export default buildPlayerInfo;
