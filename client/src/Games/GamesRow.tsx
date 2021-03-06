import React from "react";
import {
  TableCell,
  TableRow,
} from "@material-ui/core";
import { IGameRow } from "Game";
import GamesRowButtons from "./GamesRowButtons";

interface IProps {
  game: IGameRow;
  refreshGames: () => void;
}

const GamesRow = ({ game, refreshGames }: IProps) => {
  return (
    <>
      <TableRow>
        <TableCell>
          {game.gameId}
        </TableCell>
        <TableCell>
          {game.gameName}
        </TableCell>
        <TableCell>
          {game.numberOfPlayers}
        </TableCell>
        <TableCell>{game.gameState}</TableCell>
        <GamesRowButtons
          game={game}
          refreshGames={refreshGames}
        />
      </TableRow>
    </>
  );
};

export default GamesRow;
