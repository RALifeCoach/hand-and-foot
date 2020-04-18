import React from "react";
import Hand from './hand/hand';

const cards = [
  {suit: 'C', rank: 'A', cardId: '1', value: 13},
  {suit: 'D', rank: '2', cardId: '2', value: 1},
  {suit: 'H', rank: '3', cardId: '3', value: 2},
  {suit: 'C', rank: '3', cardId: '4', value: 2},
  {suit: 'S', rank: '4', cardId: '5', value: 3},
  {suit: 'C', rank: '5', cardId: '6', value: 4},
  {suit: 'D', rank: '5', cardId: '7', value: 4},
  {suit: 'D', rank: '6', cardId: '8', value: 5},
  {suit: 'J', cardId: '9'},
  {suit: 'S', rank: '8', cardId: '10', value: 7},
  {suit: 'C', rank: '9', cardId: '11', value: 8},
  {suit: 'C', rank: '9', cardId: '12', value: 8},
  {suit: 'C', rank: 'K', cardId: '13', value: 12},
  {suit: 'J', cardId: '14'},
];

const App = () => {
  return (
    <div className="App">
      <Hand
        cards={cards}
      />
    </div>
  );
};

export default App;
