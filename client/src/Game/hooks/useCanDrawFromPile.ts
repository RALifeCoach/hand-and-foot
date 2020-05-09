import { IGame } from "Game";
import { useCallback } from "react";
import mapCards from "../functions/mapCards";
import isWildCard from "../functions/isWildCard";
import canDrawFromPileRun from "../functions/canDrawFromPileRun";

const useCanDrawFromPile = () => {
  return useCallback((game: IGame): string | null => {
    if (game.gameState !== "inPlay" || !game.currentPlayer.isPlayerTurn) {
      return "It isn't your turn";
    }
    if (game.currentPlayer.playerState !== "draw") {
      return null;
    }

    const player = game.currentPlayer;
    if (player.numberOfCardsToDraw < 2) {
      return "You can only draw from the pile on the first draw";
    }
    if (game.discardCard === null) {
      return "You cannot draw from an empty pile";
    }
    if (!game.canDraw7) {
      return "You cannot draw from the pile";
    }

    const discardCard = game.discardCard;
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
    const team = game.teams[player.teamId];
    if (!game.pileIsLocked && game.canPickupWithWild && team.isDown) {
      if (mapping.others.wild && mapping.ranks[discardCard.rank] === 1) {
        return "";
      }
    }

    //check for matching cards for a run
    return canDrawFromPileRun(discardCard, mapping, player);
  }, []);
};

export default useCanDrawFromPile;
