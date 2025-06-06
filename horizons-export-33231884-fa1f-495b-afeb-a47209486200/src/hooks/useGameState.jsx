
import React, { useState, useEffect } from 'react';
import { getRandomWords, initialWordPool } from "@/lib/wordUtils";
import { usePersistentState } from "@/hooks/usePersistentState";
import usePlayerState from "@/hooks/usePlayerState";

export const useGameState = (gameConfig, gameSettings) => {
  const { numPlayers, playerNames } = gameSettings;

  const player1Hook = usePlayerState(1, gameConfig, playerNames.player1 || "Joueur 1");
  const player2Hook = usePlayerState(2, gameConfig, playerNames.player2 || "Joueur 2");
  const player3Hook = usePlayerState(3, gameConfig, playerNames.player3 || "Joueur 3");
  const player4Hook = usePlayerState(4, gameConfig, playerNames.player4 || "Joueur 4");

  const allPlayerHooks = [player1Hook, player2Hook, player3Hook, player4Hook];
  const activePlayers = allPlayerHooks.slice(0, numPlayers);


  const [availableWords, setAvailableWords] = usePersistentState('ggds_availWords_v15', [], () => {
    if (gameConfig && gameConfig.AVAILABLE_WORDS_COUNT) {
      return getRandomWords(gameConfig.AVAILABLE_WORDS_COUNT);
    }
    return [];
  });
  const [sentenceWords, setSentenceWords] = usePersistentState('ggds_sentWords_v15', []);
  const [currentSentence, setCurrentSentence] = usePersistentState('ggds_currSent_v15', "");
  const [absurdityScore, setAbsurdityScore] = usePersistentState('ggds_absScore_v15', 0);
  
  const [currentPlayer, setCurrentPlayer] = usePersistentState('ggds_cPlayer_v15', 1);
  const [currentRound, setCurrentRound] = usePersistentState('ggds_currRound_v15', 1);
  const [isGameOver, setIsGameOver] = usePersistentState('ggds_isGameOver_v15', false);
  
  const [isJokerModalOpen, setIsJokerModalOpen] = useState(false);
  const [currentJokerType, setCurrentJokerType] = useState(null);
  const [isCheatMenuOpen, setIsCheatMenuOpen] = useState(false);

  const [allGameWords] = useState(initialWordPool);

  useEffect(() => {
    const storedIsGameOver = localStorage.getItem('ggds_isGameOver_v15');
    if (storedIsGameOver === null && isGameOver) {
      setIsGameOver(false); 
    }
  }, [isGameOver, setIsGameOver]);

  useEffect(() => {
    if (gameConfig && gameConfig.AVAILABLE_WORDS_COUNT && availableWords.length === 0) {
      const storedWords = localStorage.getItem('ggds_availWords_v15');
      if (!storedWords || JSON.parse(storedWords).length === 0) {
         setAvailableWords(getRandomWords(gameConfig.AVAILABLE_WORDS_COUNT));
      }
    }
  }, [gameConfig, availableWords, setAvailableWords]);
  
  useEffect(() => {
    if (gameConfig) {
      activePlayers.forEach(player => {
        if (player && (!player.jokers || typeof player.jokers.customWord === 'undefined')) {
          player.setJokers(player.initialJokersState(gameConfig));
        }
      });
    }
  }, [gameConfig, activePlayers]);

  const playerStates = {};
  activePlayers.forEach((p, i) => {
    if (p) {
      playerStates[`player${i+1}Score`] = p.score;
      playerStates[`player${i+1}History`] = p.history;
      playerStates[`player${i+1}Jokers`] = p.jokers;
      playerStates[`player${i+1}Name`] = p.name;
      playerStates[`player${i+1}SpecialEffect`] = p.showSpecialEffect;
    }
  });
  
  for (let i = numPlayers + 1; i <= 4; i++) {
    playerStates[`player${i}Score`] = 0;
    playerStates[`player${i}History`] = [];
    playerStates[`player${i}Jokers`] = player1Hook.initialJokersState(gameConfig);
    playerStates[`player${i}Name`] = "";
    playerStates[`player${i}SpecialEffect`] = false;
  }


  const state = {
    availableWords: Array.isArray(availableWords) ? availableWords : [],
    sentenceWords: Array.isArray(sentenceWords) ? sentenceWords : [],
    currentSentence, 
    absurdityScore,
    ...playerStates,
    currentPlayer, 
    currentRound, 
    isGameOver,
    isJokerModalOpen, 
    currentJokerType,
    allGameWords,
    isCheatMenuOpen,
    numPlayers,
  };

  const playerSetStates = {};
  allPlayerHooks.forEach((p, i) => {
    if (p) {
      playerSetStates[`setPlayer${i+1}Score`] = p.setScore;
      playerSetStates[`setPlayer${i+1}History`] = p.setHistory;
      playerSetStates[`setPlayer${i+1}Jokers`] = p.setJokers;
      playerSetStates[`setPlayer${i+1}Name`] = p.setName;
      playerSetStates[`setPlayer${i+1}SpecialEffect`] = p.setShowSpecialEffect;
    }
  });


  const setState = {
    setAvailableWords, 
    setSentenceWords, 
    setCurrentSentence, 
    setAbsurdityScore,
    ...playerSetStates,
    setCurrentPlayer, 
    setCurrentRound, 
    setIsGameOver,
    setIsJokerModalOpen, 
    setCurrentJokerType,
    setIsCheatMenuOpen,
  };

  return { state, setState };
};
