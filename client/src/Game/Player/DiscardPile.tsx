import React, { memo, useCallback, useState } from "react";
import { IGamePlay } from "Game";
import { IGameBase } from "../../../../models/game";
import useCanDiscard from "../hooks/useCanDiscard";
import PlayingCard from '../PlayingCard/PlayingCard';
import useCanDrawFromPile from "../hooks/useCanDrawFromPile";
import useSendMessage from "../hooks/useSendMessage";
import useSelectedCards from "../hooks/useSelectedCards";
import SnackAlert from "../../shared/SnackAlert";
import { LockOutlined } from '@mui/icons-material';
import {useRecoilValue} from 'recoil'
import {gameBaseAtom, gamePlayAtom} from '../../atoms/game'
import useDebounce from '../hooks/useDebounce'

const DiscardPile = () => {
  const gamePlay = useRecoilValue(gamePlayAtom) as IGamePlay
  const gameBase = useRecoilValue(gameBaseAtom) as IGameBase
  const canDiscard = useCanDiscard();
  const canDraw7 = useCanDrawFromPile();
  const sendMessage = useSendMessage();
  const selectedCards = useSelectedCards(gamePlay.currentPlayer.cards);
  const [error, setError] = useState('');

  const handleClick = useCallback(() => {
    if (gamePlay.currentPlayer.playerState === 'draw7') {
      return setError("You cannot discard while still drawing 7");
    }
    const drawMessage: string | null = canDraw7(gamePlay, gameBase);
    if (drawMessage === '') {
      return sendMessage('draw7', {});
    }
    if (drawMessage !== null) {
      return setError(drawMessage);
    }
    const message = canDiscard();
    if (!message) {
      return sendMessage('discardCard', { toDiscard: selectedCards[0].cardId });
    }
    setError(message);
  }, [canDiscard, canDraw7, sendMessage, selectedCards, gamePlay, gameBase]);

  const onClick = useDebounce(handleClick, 1000)

  const displayCard = () => {
    if (gamePlay.currentPlayer.playerState === 'draw7') {
      return { cardText: 'Draw 7'}
    }
    return gamePlay.discardCard === null ? { cardText: 'Empty'} : gamePlay.discardCard
  }
  return (
    <>
      <div style={{ position: 'relative', zIndex: 500 }} >
        <PlayingCard
          card={displayCard()}
          left={0}
          top={0}
          onSelect={handleClick}
          onMoved={() => {}}
        >
        <div
          className="absolute top-7 left-0 w-full text-center text-teal-600"
          onClick={event => onClick(event)}
        >
          <span className="text-md">{gamePlay.discardCount.toString()}</span>
        </div>
        {gamePlay.pileIsLocked && (
          <div
            style={{ position: 'absolute', top: 60, left: 22 }}
            onClick={event => onClick(event)}
          >
            <LockOutlined style={{ width: 25, height: 25 }} />
          </div>
        )}
        </PlayingCard>
      </div>
      <SnackAlert
        open={Boolean(error)}
        text={error}
        severity="error"
        onClose={() => setError('')}
      />
    </>
  );
};

export default memo(DiscardPile);
