import React from "react";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import Hand from "../Hand/Hand";
import Meld from "../Meld/Meld";
import { IPlayerCurrent, ICard } from "Game";

interface IProps {
  player: IPlayerCurrent;
  cards: ICard[];
  sortOrder: string;
  cardMoving: ICard | null;
}

const Player = ({ player, cards, sortOrder, cardMoving }: IProps) => {
  return (
    <>
      <FlexColumn>
        <div>Player {player.playerId}</div>
        <Hand
          options={{}}
          cards={cards}
          sortOrder={sortOrder}
          cardMoving={cardMoving}
        />
        <Meld
          options={{}}
          cards={[]}
        />
      </FlexColumn>
    </>
  );
};

export default Player;
