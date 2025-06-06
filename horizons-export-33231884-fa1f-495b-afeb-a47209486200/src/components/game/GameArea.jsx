
import React from 'react';
import PlayerDisplay from '@/components/PlayerDisplay';
import MainGameArea from '@/components/MainGameArea';

const GameArea = ({ state, dndActions, gameActions, setSentenceWords, openJokerModal, TOTAL_ROUNDS, availableWordsCount }) => {
  const { 
    player1Score, player2Score, currentPlayer, 
    player1Jokers, player2Jokers, 
    player1History, player2History,
    currentRound,
    player1SpecialEffect, player2SpecialEffect
  } = state;

  return (
    <div className="flex flex-col lg:flex-row flex-1 gap-4">
      <div className="w-full lg:w-1/4 flex flex-col gap-4">
        <PlayerDisplay
          playerNumber={1}
          score={player1Score}
          isActive={currentPlayer === 1}
          history={player1History}
          jokers={player1Jokers}
          onUseJoker={(type) => openJokerModal(type)}
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          showSpecialEventEffect={player1SpecialEffect}
        />
        <PlayerDisplay
          playerNumber={2}
          score={player2Score}
          isActive={currentPlayer === 2}
          history={player2History}
          jokers={player2Jokers}
          onUseJoker={(type) => openJokerModal(type)}
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          showSpecialEventEffect={player2SpecialEffect}
        />
      </div>
      <div className="w-full lg:w-3/4 flex flex-col">
        <MainGameArea 
          state={state}
          dndActions={dndActions}
          setSentenceWords={setSentenceWords}
          availableWordsCount={availableWordsCount}
        />
      </div>
    </div>
  );
};

export default GameArea;
