
import React from 'react';
import PlayerDisplay from "@/components/PlayerDisplay";
import MainGameArea from "@/components/MainGameArea";

const GameLayout = ({
  player1Score, player1History, player1Jokers,
  player2Score, player2History, player2Jokers,
  currentPlayer, isGameOver, openJokerModal, currentRound, totalRounds,
  availableWords, sentenceWords, currentSentence, absurdityScore,
  isDragging, draggedItemInfo, onWordDragStart, handleActualDragEnd,
  handleDropInAvailable, handleDropInSentence, setSentenceWords
}) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-custom-layout gap-4 md:gap-6 mb-6">
      <PlayerDisplay 
        playerNumber={1} 
        score={player1Score} 
        isActive={currentPlayer === 1 && !isGameOver} 
        history={player1History}
        jokers={player1Jokers}
        onUseJoker={openJokerModal}
        currentRound={currentRound}
        totalRounds={totalRounds}
      />
      
      <div className="lg:col-span-1 order-first lg:order-none">
         <MainGameArea
          availableWords={availableWords}
          sentenceWords={sentenceWords}
          currentSentence={currentSentence}
          absurdityScore={absurdityScore}
          isDragging={isDragging}
          draggedItemInfo={draggedItemInfo}
          onWordDragStart={onWordDragStart}
          handleActualDragEnd={handleActualDragEnd}
          handleDropInAvailable={handleDropInAvailable}
          handleDropInSentence={handleDropInSentence}
          setSentenceWords={setSentenceWords}
          currentPlayer={currentPlayer}
          currentRound={currentRound}
          totalRounds={totalRounds}
        />
      </div>
      
      <PlayerDisplay 
        playerNumber={2} 
        score={player2Score} 
        isActive={currentPlayer === 2 && !isGameOver} 
        history={player2History}
        jokers={player2Jokers}
        onUseJoker={openJokerModal}
        currentRound={currentRound}
        totalRounds={totalRounds}
      />
    </div>
  );
};

export default GameLayout;
