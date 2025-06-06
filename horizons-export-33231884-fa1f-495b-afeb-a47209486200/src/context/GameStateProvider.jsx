
import React from 'react';
import { GameStateContext } from './GameStateContext';
import { useGameStateController } from '@/hooks/useGameStateController';

const GameStateProvider = ({ children, gameSettings, onResetToSetup }) => {
  const controllerProps = useGameStateController(gameSettings, onResetToSetup);

  if (!controllerProps || !controllerProps.state || !controllerProps.gameActions) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-900 text-white">
        Chargement du Construteur de Phrases Absurdes...
      </div>
    );
  }

  return (
    <GameStateContext.Provider value={controllerProps}>
      {children}
    </GameStateContext.Provider>
  );
};

export default GameStateProvider;
