
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import { useGameConfig } from "@/hooks/useGameConfig";

export const useCheatCodes = (state, setState, gameActions) => {
  const gameConfig = useGameConfig(); 
  const { currentPlayer, numPlayers } = state;
  const { setIsCheatMenuOpen } = setState;

  const applyCheatCode = (code) => {
    const lowerCaseCode = code.toLowerCase();
    
    if (!gameConfig || !gameConfig.CHEAT_CODE_POINTS) {
      return;
    }

    if (lowerCaseCode === "co00lgui") {
      if (setIsCheatMenuOpen) {
        setIsCheatMenuOpen(true);
        toast({
          title: "🤫 Menu de Triche Déverrouillé !",
          description: "Le panneau secret est maintenant accessible.",
          className: "bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 text-white font-extrabold",
          duration: 4000,
        });
      }
      return;
    }

    const points = gameConfig.CHEAT_CODE_POINTS[lowerCaseCode];

    if (points !== undefined) {
      const setScoreFn = setState[`setPlayer${currentPlayer}Score`];
      if (typeof setScoreFn === 'function') {
        setScoreFn(prev => prev + points);
      }

      if (lowerCaseCode === "co00gui" && gameActions && typeof gameActions.addSpecialWordToAvailable === 'function') {
        gameActions.addSpecialWordToAvailable("co00gui");
      }
    }
  };

  return { applyCheatCode };
};
