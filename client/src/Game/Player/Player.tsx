import React, { useContext } from "react";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import Hand from "../Hand/Hand";
import Meld from "../Meld/Meld";
import { IPlayerCurrent, ICard, IGame } from "Game";
import OtherPlayers from '../Player/OtherPlayers';
import GameContext from '../GameContext';
import { Paper } from "@material-ui/core";
import FlexRow from "../../shared/flex-grid/FlexRow";
import Spacer from "../../shared/Spacer";
import DrawCard from "./DrawCard";

interface IProps {
  player: IPlayerCurrent;
  cards: ICard[];
  sortOrder: string;
  cardMoving: ICard | null;
}

const Player = ({ player, cards, sortOrder, cardMoving }: IProps) => {
  const { gameId, playerId, gameState: { game }, gameDispatch } = useContext(GameContext);

  return (
    <Paper elevation={1} style={{ margin: 8 }}>
      <FlexColumn>
        <div style={{ marginLeft: 16 }}>Player {player.playerId}</div>
        <FlexRow>
          <OtherPlayers game={game as IGame} />
          <Spacer multiplier={2} />
          <DrawCard
            game={game as IGame}
            gameDispatch={gameDispatch}
            gameId={gameId}
            playerId={playerId}
          />
        </FlexRow>
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
    </Paper>
  );
};

export default Player;
