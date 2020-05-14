import React, { useState } from "react";
import { Button, Typography } from "@material-ui/core";
import EditGame from "./EditGame";

interface IProps {
  refreshGames: () => void;
}

const GamesHeaderButtons = ({ refreshGames }: IProps) => {
  const [newOpen, setNewOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setNewOpen(true)}
        variant="outlined"
      >
        <Typography variant="subtitle1">New Game</Typography>
      </Button>
      {newOpen && (
        <EditGame
          game={{ gameName: "", numberOfPlayers: 4 }}
          open={newOpen}
          onClose={() => setNewOpen(false)}
          refreshGames={refreshGames}
        />
      )}
    </>
  );
};

export default GamesHeaderButtons;
