
import React, { useState } from 'react';
import { usePersistentState } from "@/hooks/usePersistentState";

const usePlayerState = (playerNumber, gameConfig, defaultName) => {
  const initialJokers = (config) => ({
    customWord: config?.INITIAL_JOKERS?.customWord ?? 1,
    customPhrase: config?.INITIAL_JOKERS?.customPhrase ?? 1,
  });

  const [name, setName] = usePersistentState(`ggds_p${playerNumber}Name_v15`, defaultName);
  const [score, setScore] = usePersistentState(`ggds_p${playerNumber}Score_v15`, 0);
  const [history, setHistory] = usePersistentState(`ggds_p${playerNumber}Hist_v15`, []);
  const [jokers, setJokers] = usePersistentState(`ggds_p${playerNumber}Jokers_v15`, () => initialJokers(gameConfig));
  const [showSpecialEffect, setShowSpecialEffect] = useState(false);

  return { 
    name,
    setName,
    score, 
    setScore, 
    history, 
    setHistory, 
    jokers, 
    setJokers, 
    showSpecialEffect, 
    setShowSpecialEffect,
    initialJokersState: initialJokers 
  };
};

export default usePlayerState;
