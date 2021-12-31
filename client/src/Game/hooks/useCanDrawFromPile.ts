import { IGamePlay } from "Game";
import { IGameBase } from "../../../../models/game";
import { useCallback } from "react";
import mapCards from "../functions/mapCards";
import isWildCard from "../functions/isWildCard";
import canDrawFromPileRun from "../functions/canDrawFromPileRun";

const useCanDrawFromPile = () => {
  return useCallback((gamePlay: IGamePlay, gameBase: IGameBase): string | null => {
    if (gamePlay.gameState !== "inPlay" || !gamePlay.currentPlayer.isPlayerTurn) {
      return "It isn't your turn";
    }
    if (gamePlay.currentPlayer.playerState !== "draw") {
      return null;
    }

    const player = gamePlay.currentPlayer;
    if (player.numberOfCardsToDraw < 2) {
      return "You can only draw from the pile on the first draw";
    }
    if (gamePlay.discardCard === null) {
      return "You cannot draw from an empty pile";
    }
    if (!gameBase.canDraw7) {
      return "You cannot draw from the pile";
    }

    const discardCard = gamePlay.discardCard;
    if (discardCard.rank === "3") {
      return "You cannot draw a 3";
    }
    if (isWildCard(discardCard)) {
      return "You cannot draw a wild card";
    }

    // check for matching cards for a meld
    const mapping = mapCards(player.cards);
    if (mapping.ranks[discardCard.rank] > 1) {
      return "";
    }
    const team = gamePlay.teams[player.teamId];
    if (!gamePlay.pileIsLocked && gameBase.canPickupWithWild && team.isDown) {
      if (mapping.others.wild && mapping.ranks[discardCard.rank] === 1) {
        return "";
      }
    }

    //check for matching cards for a run
    return canDrawFromPileRun(discardCard, mapping, player);
  }, []);
};

export default useCanDrawFromPile;
