
import { usePersistentState } from "@/hooks/usePersistentState";

export const useGameSetup = () => {
  const [gameSettings, setGameSettings] = usePersistentState('ggds_gameSettings_v16', null);

  const handleGameSetupComplete = (settings) => {
    setGameSettings(settings);
  };

  const handleResetToSetup = () => {
    setGameSettings(null);
    localStorage.removeItem('ggds_gameSettings_v16');
    for (let i = 1; i <= 4; i++) {
      localStorage.removeItem(`ggds_p${i}Name_v16`);
      localStorage.removeItem(`ggds_p${i}Score_v16`);
      localStorage.removeItem(`ggds_p${i}Hist_v16`);
      localStorage.removeItem(`ggds_p${i}Jokers_v16`);
    }
    localStorage.removeItem('ggds_cPlayer_v16');
    localStorage.removeItem('ggds_currRound_v16');
    localStorage.removeItem('ggds_isGameOver_v16');
    localStorage.removeItem('ggds_availWords_v16');
    localStorage.removeItem('ggds_sentWords_v16');
    localStorage.removeItem('ggds_currSent_v16');
    localStorage.removeItem('ggds_absScore_v16');
  };

  return {
    gameSettings,
    setGameSettings,
    handleGameSetupComplete,
    handleResetToSetup,
  };
};
