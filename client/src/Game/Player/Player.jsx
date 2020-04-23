import React from "react";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import Hand from "../Hand/Hand";
import Meld from "../Meld/Meld";

const Player = ({ player }) => {
  return (
    <>
      <FlexColumn>
        <div>Player {player.playerId}</div>
        <Hand cards={player.cards} />
        <Meld cards={[]} />
      </FlexColumn>
    </>
  );
};

export default Player;
