
import React from 'react';
import { useGameState } from "@/hooks/useGameState";
import { useGameActions } from "@/hooks/useGameActions";
import { useDragAndDrop } from "@/hooks/useDragAndDrop";
import { useGameConfig } from "@/hooks/useGameConfig";
import { useCheatCodes } from "@/hooks/useCheatCodes";

export const useGameStateController = (gameSettings, onResetToSetup) => {
  const gameConfig = useGameConfig();
  const { state, setState } = useGameState(gameConfig, gameSettings);
  
  const gameActions = useGameActions(state, setState, gameConfig, gameSettings, onResetToSetup);
  const dndActions = useDragAndDrop(state, setState, gameActions);
  const cheatCodeActions = useCheatCodes(state, setState, gameActions);

  return {
    state,
    setState,
    dndActions,
    gameActions,
    cheatCodeActions,
    setSentenceWords: setState.setSentenceWords,
    setIsJokerModalOpen: setState.setIsJokerModalOpen,
    setIsGameOver: setState.setIsGameOver,
    setIsCheatMenuOpen: setState.setIsCheatMenuOpen,
    TOTAL_ROUNDS: gameConfig.TOTAL_ROUNDS,
    AVAILABLE_WORDS_COUNT: gameConfig.AVAILABLE_WORDS_COUNT,
    gameSettings,
  };
};
