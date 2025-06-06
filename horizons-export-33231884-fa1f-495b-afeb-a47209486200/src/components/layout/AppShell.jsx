
import React from "react";
import { motion } from "framer-motion";
import { Toaster } from "@/components/ui/toaster";
import GameControls from "@/components/GameControls";
import JokerModal from "@/components/JokerModal";
import GameOverDialog from "@/components/GameOverDialog";
import Header from "@/components/layout/Header";
import GameLayout from "@/components/layout/GameLayout";
import EffectsLayer from "@/components/layout/EffectsLayer";
import { useGameState } from "@/context/GameStateContext";

const AppShell = ({ AnimatedScoreComponent }) => {
  const {
    availableWords, sentenceWords, currentSentence, absurdityScore,
    player1Score, player2Score, currentPlayer, player1History, player2History,
    player1Jokers, player2Jokers,
    currentRound, TOTAL_ROUNDS, isGameOver, setIsGameOver,
    isDragging, draggedItemInfo,
    isJokerModalOpen, currentJokerType, setIsJokerModalOpen,
    onWordDragStart, handleActualDragEnd, 
    handleDropInSentence, handleDropInAvailable,
    setSentenceWords, submitSentence, refreshWords, resetGame, skipTurn,
    openJokerModal, handleUseJoker
  } = useGameState();

  const activePlayerJokers = currentPlayer === 1 ? player1Jokers : player2Jokers;

  return (
    <div className="min-h-screen py-6 px-2 sm:px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <EffectsLayer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto relative z-10"
      >
        <Header 
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          currentPlayer={currentPlayer}
          isGameOver={isGameOver}
        />

        <GameLayout
          player1Score={player1Score} player1History={player1History} player1Jokers={player1Jokers}
          player2Score={player2Score} player2History={player2History} player2Jokers={player2Jokers}
          currentPlayer={currentPlayer} isGameOver={isGameOver} openJokerModal={openJokerModal}
          currentRound={currentRound} totalRounds={TOTAL_ROUNDS}
          availableWords={availableWords} sentenceWords={sentenceWords} currentSentence={currentSentence} absurdityScore={absurdityScore}
          isDragging={isDragging} draggedItemInfo={draggedItemInfo} onWordDragStart={onWordDragStart} handleActualDragEnd={handleActualDragEnd}
          handleDropInAvailable={handleDropInAvailable} handleDropInSentence={handleDropInSentence} setSentenceWords={setSentenceWords}
          AnimatedScoreComponent={AnimatedScoreComponent}
        />
        
        <GameControls
          onSubmit={submitSentence}
          onRefreshWords={refreshWords}
          onResetGame={resetGame}
          onSkipTurn={skipTurn}
          sentenceWordCount={sentenceWords.length}
          currentPlayer={currentPlayer}
          onOpenJokerModal={openJokerModal}
          playerJokers={activePlayerJokers}
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          isGameOver={isGameOver}
        />
      </motion.div>
      
      <JokerModal 
        isOpen={isJokerModalOpen}
        onClose={() => setIsJokerModalOpen(false)}
        onUseJoker={handleUseJoker}
        jokerType={currentJokerType}
      />
      <GameOverDialog 
        isOpen={isGameOver}
        onClose={() => setIsGameOver(false)} 
        player1Score={player1Score}
        player2Score={player2Score}
        onResetGame={resetGame}
        AnimatedScoreComponent={AnimatedScoreComponent}
      />
      <Toaster />
    </div>
  );
};

export default AppShell;
