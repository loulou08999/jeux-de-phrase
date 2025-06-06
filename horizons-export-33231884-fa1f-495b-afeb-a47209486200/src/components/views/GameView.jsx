
import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { GameStateContext } from '@/context/GameStateContext';
import Header from '@/components/layout/Header';
import PlayerDisplay from '@/components/PlayerDisplay';
import MainGameArea from '@/components/MainGameArea';
import GameControls from '@/components/GameControls';
import JokerModal from '@/components/JokerModal';
import GameOverDialog from '@/components/GameOverDialog';
import CheatCodeInput from '@/components/CheatCodeInput';
import CheatMenu from '@/components/CheatMenu';
import AllWordsPanel from '@/components/game/AllWordsPanel';
import BackgroundAnimations from '@/components/layout/BackgroundAnimations';
import EffectsLayer from '@/components/layout/EffectsLayer';
import { initialWordPool } from '@/lib/wordUtils';
import { Button } from "@/components/ui/button";
import { Settings } from 'lucide-react';

const GameView = () => {
  const context = useContext(GameStateContext);

  if (!context) {
    return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Erreur de chargement du contexte de jeu. Vérifiez GameStateProvider.</div>;
  }
  
  const { 
    state, 
    dndActions, 
    gameActions, 
    cheatCodeActions, 
    setSentenceWords, 
    setIsJokerModalOpen, 
    setIsGameOver,
    setIsCheatMenuOpen, 
    TOTAL_ROUNDS,
    gameSettings 
  } = context;

  if (!state || !gameSettings) {
     return <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">Chargement des données du jeu...</div>;
  }

  const {
    currentPlayer,
    currentRound, isGameOver,
    isJokerModalOpen, currentJokerType,
    sentenceWords, availableWords,
    isCheatMenuOpen, numPlayers
  } = state;

  const {
    submitSentence, refreshWords, resetGame, skipTurn,
    openJokerModal, handleUseJoker,
    cheatAddScore, cheatSetScore, cheatAddJokers, cheatResetJokers,
    addSpecialWordToAvailable, cheatEndRound, cheatChangeRound, cheatTriggerSpecialEvent,
    cheatWinGame, cheatLoseGame, cheatFillSentence, cheatClearSentence
  } = gameActions;

  const { applyCheatCode } = cheatCodeActions;
  const activePlayerJokers = state[`player${currentPlayer}Jokers`];
  const currentPlayerName = state[`player${currentPlayer}Name`] || `Joueur ${currentPlayer}`;

  const playerDisplayGridCols = numPlayers === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-2';
  const playerDisplayItemSpan = numPlayers === 3 ? 'lg:col-span-1' : 'lg:col-span-1';


  return (
    <div className="min-h-screen py-6 px-2 sm:px-4 md:px-6 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white overflow-hidden relative">
      <BackgroundAnimations />
      <EffectsLayer />
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto relative z-10 flex flex-col min-h-screen"
      >
        <Header 
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          currentPlayerName={currentPlayerName}
          isGameOver={isGameOver}
          numPlayers={numPlayers}
        />
        <div className="flex flex-col lg:flex-row flex-1 gap-4 mt-4">
          <div className={`w-full lg:w-2/5 grid grid-cols-1 sm:grid-cols-2 ${playerDisplayGridCols} gap-4`}>
            {Array.from({ length: numPlayers }).map((_, index) => {
              const playerNum = index + 1;
              return (
                <div key={`player-display-wrapper-${playerNum}`} className={numPlayers > 2 && playerNum > 2 && numPlayers % 2 !== 0 && playerNum === numPlayers ? `sm:col-span-2 ${playerDisplayGridCols === 'lg:grid-cols-3' ? 'lg:col-start-2' : ''}` : playerDisplayItemSpan}>
                  <PlayerDisplay
                    playerNumber={playerNum}
                    playerName={state[`player${playerNum}Name`] || `Joueur ${playerNum}`}
                    score={state[`player${playerNum}Score`]}
                    isActive={currentPlayer === playerNum}
                    history={state[`player${playerNum}History`]}
                    jokers={state[`player${playerNum}Jokers`]}
                    onUseJoker={(type) => openJokerModal(type)}
                    currentRound={currentRound}
                    totalRounds={TOTAL_ROUNDS}
                    showSpecialEventEffect={state[`player${playerNum}SpecialEffect`]}
                    numPlayers={numPlayers}
                  />
                </div>
              );
            })}
          </div>
          <div className="w-full lg:w-3/5 flex flex-col">
            <MainGameArea
              availableWords={Array.isArray(availableWords) ? availableWords : []}
              sentenceWords={Array.isArray(sentenceWords) ? sentenceWords : []}
              currentSentence={state.currentSentence}
              absurdityScore={state.absurdityScore}
              isDragging={dndActions.isDragging}
              draggedItemInfo={dndActions.draggedItemInfo}
              onWordDragStart={dndActions.onWordDragStart}
              handleActualDragEnd={dndActions.handleActualDragEnd}
              handleDropInAvailable={dndActions.handleDropInAvailable}
              handleDropInSentence={dndActions.handleDropInSentence}
              setSentenceWords={setSentenceWords}
              currentPlayerName={currentPlayerName}
              currentRound={currentRound}
              totalRounds={TOTAL_ROUNDS}
            />
          </div>
        </div>
         <AllWordsPanel allWords={initialWordPool} availableWords={Array.isArray(availableWords) ? availableWords : []} />
        
        <GameControls
          onSubmit={submitSentence}
          onRefreshWords={refreshWords}
          onResetGame={() => resetGame(false)}
          onSkipTurn={skipTurn}
          sentenceWordCount={Array.isArray(sentenceWords) ? sentenceWords.length : 0}
          currentPlayerName={currentPlayerName}
          playerJokers={activePlayerJokers}
          currentRound={currentRound}
          totalRounds={TOTAL_ROUNDS}
          isGameOver={isGameOver}
          numPlayers={numPlayers}
        />
         <div className="text-center mt-4">
            <Button
                variant="ghost"
                onClick={() => resetGame(true)}
                className="text-xs text-slate-400 hover:text-slate-200"
            >
                <Settings className="mr-2 h-4 w-4" /> Changer la configuration / Réinitialiser tout
            </Button>
        </div>
      </motion.div>
      
      <JokerModal 
        isOpen={isJokerModalOpen}
        onClose={() => setIsJokerModalOpen(false)}
        onUseJoker={handleUseJoker}
        jokerType={currentJokerType}
      />
      <GameOverDialog 
        isOpen={isGameOver}
        onClose={() => {
          setIsGameOver(false);
          if (isGameOver) { 
            resetGame(false);
          }
        }} 
        playersState={
            Array.from({length: numPlayers}).map((_, i) => ({
                name: state[`player${i+1}Name`],
                score: state[`player${i+1}Score`]
            }))
        }
        onResetGame={() => {
          setIsGameOver(false);
          resetGame(false);
        }}
        numPlayers={numPlayers}
      />
      <CheatCodeInput onApplyCheatCode={applyCheatCode} />
      <CheatMenu
        isOpen={isCheatMenuOpen}
        onClose={() => setIsCheatMenuOpen && setIsCheatMenuOpen(false)}
        onAddScore={(points, target) => cheatAddScore && cheatAddScore(points, target)}
        onSetScore={(score, target) => cheatSetScore && cheatSetScore(score, target)}
        onAddJokers={(count, target) => cheatAddJokers && cheatAddJokers(count, target)}
        onResetJokers={(target) => cheatResetJokers && cheatResetJokers(target)}
        onAddWord={(word, target) => addSpecialWordToAvailable && addSpecialWordToAvailable(word, target, true)}
        onEndRound={() => cheatEndRound && cheatEndRound()}
        onChangeRound={(delta) => cheatChangeRound && cheatChangeRound(delta)}
        onTriggerSpecialEvent={(target) => cheatTriggerSpecialEvent && cheatTriggerSpecialEvent(target)}
        onWinGame={(target) => cheatWinGame && cheatWinGame(target)}
        onLoseGame={(target) => cheatLoseGame && cheatLoseGame(target)}
        onFillSentence={() => cheatFillSentence && cheatFillSentence()}
        onClearSentence={() => cheatClearSentence && cheatClearSentence()}
        numPlayers={numPlayers}
      />
    </div>
  );
};

export default GameView;
