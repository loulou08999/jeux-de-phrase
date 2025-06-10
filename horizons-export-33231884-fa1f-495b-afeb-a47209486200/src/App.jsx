
import React, { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import GameStateProvider from "@/context/GameStateProvider";
import GameView from "@/components/views/GameView";
import GameSetupScreen from "@/components/views/GameSetupScreen";
import { usePersistentState } from "@/hooks/usePersistentState";
import AuthModal from "@/components/auth/AuthModal";
import LoginForm from "@/components/auth/LoginForm";
import SignupForm from "@/components/auth/SignupForm";

const App = () => {
  const [gameSettings, setGameSettings] = usePersistentState('ggds_gameSettings_v15', null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleGameSetupComplete = (settings) => {
    setGameSettings(settings);
  };

  const handleResetToSetup = () => {
    setGameSettings(null);
    localStorage.removeItem('ggds_gameSettings_v15');
    for (let i = 1; i <= 4; i++) {
      localStorage.removeItem(`ggds_p${i}Name_v15`);
      localStorage.removeItem(`ggds_p${i}Score_v15`);
      localStorage.removeItem(`ggds_p${i}Hist_v15`);
      localStorage.removeItem(`ggds_p${i}Jokers_v15`);
    }
    localStorage.removeItem('ggds_cPlayer_v15');
    localStorage.removeItem('ggds_currRound_v15');
    localStorage.removeItem('ggds_isGameOver_v15');
    localStorage.removeItem('ggds_availWords_v15');
    localStorage.removeItem('ggds_sentWords_v15');
    localStorage.removeItem('ggds_currSent_v15');
    localStorage.removeItem('ggds_absScore_v15');
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  if (!isAuthenticated) {
    return (
      <AuthModal onAuthSuccess={handleAuthSuccess} LoginForm={LoginForm} SignupForm={SignupForm} />
    );
  }

  if (!gameSettings) {
    return (
      <>
        <GameSetupScreen onSetupComplete={handleGameSetupComplete} />
        <Toaster />
      </>
    );
  }

  return (
    <GameStateProvider gameSettings={gameSettings} onResetToSetup={handleResetToSetup}>
      <GameView />
      <Toaster />
    </GameStateProvider>
  );
};

export default App;
