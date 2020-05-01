import React, { useCallback } from "react";
import FlexColumn from "../../shared/flex-grid/FlexColumn";
import Hand from "../Hand/Hand";
import { IPlayerCurrent, ICard, IGame } from "Game";
import OtherPlayers from '../Player/OtherPlayers';
import { Paper } from "@material-ui/core";
import FlexRow from "../../shared/flex-grid/FlexRow";
import Spacer from "../../shared/Spacer";
import PlayerAction from "./PlayerAction";
import DiscardPile from './DiscardPile';
import TeamMelds from "../Meld/TeamMelds";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedCards from "../hooks/useSelectedCards";
import useCanPlay from "../hooks/useCanPlay";

interface IProps {
  player: IPlayerCurrent;
  game: IGame;
  selected: { [cardId: string]: boolean }
  sortOrder: string;
  cardMoving: ICard | null;
}

const Player = ({ player, game, selected, sortOrder, cardMoving }: IProps) => {
  const cards = useSelectedCards(game.currentPlayer.cards, selected);
  const playValues = useCanPlay(game, cards, null);

  const sendMessage = useSendMessage();

  const handlePlay = useCallback(() => {
    if (playValues) {
      sendMessage('playCards', { cardIds: cards.map(card => card.cardId), meldId: null, ...playValues })
    }
  }, [playValues, cards, sendMessage]);

  return (
    <Paper elevation={1} style={{ margin: 8 }}>
      <FlexColumn>
        <div style={{ marginLeft: 16 }}>Player {player.playerId}</div>
        <FlexRow>
          <OtherPlayers game={game as IGame} />
          <Spacer multiplier={2} />
          <PlayerAction
            game={game}
          />
        </FlexRow>
        <Hand
          options={{}}
          cards={game.currentPlayer.cards}
          selected={selected}
          sortOrder={sortOrder}
          cardMoving={cardMoving}
        />
      </FlexColumn>
      <FlexRow style={{ height: 120, width: '100%', position: 'relative', paddingLeft: 8 }}>
        <DiscardPile
          game={game}
          selected={selected}
        />
        <div style={{ width: '100%', position: 'relative', paddingLeft: 80 }}
          onClick={handlePlay}
        >
          <TeamMelds
            team={game.teams[game.currentPlayer.teamId]}
          />
        </div>
      </FlexRow>
      {Object.values(game.teams)
        .filter(team => team.teamId !== game.currentPlayer.teamId)
        .map(team => (
          <FlexRow
            style={{ height: 120, width: '100%', position: 'relative', paddingLeft: 88 }}
            key={team.teamId}
          >
            <TeamMelds
              team={team}
            />
          </FlexRow>
        ))}
    </Paper>
  );
};

export default Player;
