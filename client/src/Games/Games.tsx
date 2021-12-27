import React, {useCallback, useEffect} from "react";
import {
  Paper,
  Table,
  TableBody,
  Typography
} from "@mui/material";
import Spacer from "../shared/Spacer";
import useFetchGet from "../hooks/useFetchGet";
import {IGameRow} from "Game";
import GamesHeader from "./GamesHeader";
import GamesRow from "./GamesRow";
import FlexRow from "../shared/flex-grid/FlexRow";
import GamesHeaderButtons from "./GamesHeaderButtons";
import FetchHandling from "../shared/FetchHandling";
import ApplicationBar from "../App/ApplicationBar";

const Games = () => {
  const [games, fetchGames] = useFetchGet();

  useEffect(() => {
    fetchGames('api/game/query');
  }, [fetchGames]);

  const refreshGames = useCallback(() => {
    fetchGames('api/game/query');
  }, [fetchGames]);

  return (
    <>
      <ApplicationBar
        notifications={false}
      />
      <Paper elevation={1} style={{padding: 16, margin: '96px 16px 16px 16px'}}>
        <FlexRow justify="space-between">
          <Typography variant="h2">Games</Typography>
          <GamesHeaderButtons
            refreshGames={refreshGames}
          />
        </FlexRow>
        <Spacer height={16}/>
        <Table size="small">
          <GamesHeader/>
          <TableBody>
            {(games?.data || []).map((game: IGameRow) => (
              <GamesRow
                refreshGames={refreshGames}
                game={game}
                key={game.gameId}
              />
            ))}
          </TableBody>
        </Table>
      </Paper>
      <FetchHandling status={games} title="Loading games..."/>
    </>
  );
};

export default Games;
