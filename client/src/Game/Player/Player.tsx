import React from "react";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import Hand from "../Hand/Hand";
import { IPlayerCurrent, ICard, IGamePlay, IGameBase } from "Game";
import { Paper } from "@material-ui/core";
import FlexRow from "../../shared/flex-grid/FlexRow";
import PlayerAction from "./PlayerAction";
import DiscardPile from './DiscardPile';
import PlayersStats from "./PlayersStats";
import AllTeamMelds from "../Meld/AllTeamMelds";
import PickupPile from "./PickupPile";

interface IProps {
  player: IPlayerCurrent;
  gameBase: IGameBase;
  gamePlay: IGamePlay;
  selected: { [cardId: string]: boolean }
  sortOrder: string;
  cardMoving: ICard | null;
}

const Player = ({ player, gameBase, gamePlay, selected, sortOrder, cardMoving }: IProps) => {
  return (
    <>
      <Paper elevation={1} style={{ margin: 8 }}>
        <FlexColumn style={{ marginLeft: 8 }}>
          <FlexRow>
            <PlayersStats
              gamePlay={gamePlay}
              player={player}
            />
            <PlayerAction
              gamePlay={gamePlay}
            />
          </FlexRow>
          <Hand
            options={{}}
            cards={gamePlay.currentPlayer.cards}
            selected={selected}
            sortOrder={sortOrder}
            cardMoving={cardMoving}
          />
        </FlexColumn>
        <FlexRow style={{ height: 120, width: '100%', position: 'relative', paddingLeft: 8 }}>
          <FlexRow>
            <div style={{ width: 80 }}>
              <PickupPile
                gamePlay={gamePlay}
                pickupPile={gamePlay.pickupPiles[0]}
                pileIndex={0}
              />
            </div>
            <div style={{ width: 80 }}>
              <PickupPile
                gamePlay={gamePlay}
                pickupPile={gamePlay.pickupPiles[1]}
                pileIndex={1}
              />
            </div>
            <div style={{ width: 80 }}>
              <DiscardPile
                gamePlay={gamePlay}
                gameBase={gameBase}
                selected={selected}
              />
            </div>
            <div style={{ width: 80 }}>
              <PickupPile
                gamePlay={gamePlay}
                pickupPile={gamePlay.pickupPiles[2]}
                pileIndex={2}
              />
            </div>
            <div style={{ width: 80 }}>
              <PickupPile
                gamePlay={gamePlay}
                pickupPile={gamePlay.pickupPiles[3]}
                pileIndex={3}
              />
            </div>
          </FlexRow>
        </FlexRow>
        <AllTeamMelds
          gamePlay={gamePlay}
          gameBase={gameBase}
          selected={selected}
        />
      </Paper>
    </>
  );
};

export default Player;
