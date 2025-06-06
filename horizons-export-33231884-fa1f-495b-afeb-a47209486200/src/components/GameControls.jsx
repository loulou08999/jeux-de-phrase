
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Send, Shuffle, RefreshCw, SkipForward } from 'lucide-react';

const GameControls = ({ 
  onSubmit, 
  onRefreshWords, 
  onResetGame, 
  sentenceWordCount, 
  currentPlayerName, 
  onSkipTurn,
  currentRound,
  totalRounds,
  isGameOver,
  numPlayers
}) => {
  const canUseJoker = currentRound <= totalRounds && !isGameOver;

  return (
    <div className="flex flex-col items-center space-y-3 mt-6">
      {!isGameOver && (
        <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-3">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onSubmit}
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold rounded-xl shadow-lg shadow-emerald-500/30"
              disabled={sentenceWordCount === 0}
            >
              <Send className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Noter ({currentPlayerName})
            </Button>
          </motion.div>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button 
              onClick={onRefreshWords}
              variant="outline"
              className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md text-white/90 border-white/30 hover:bg-white/10 hover:text-white rounded-xl"
            >
              <Shuffle className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
              Mots
            </Button>
          </motion.div>
          {numPlayers > 1 && (
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onSkipTurn}
                variant="outline"
                className="w-full sm:w-auto px-4 py-2 sm:px-6 sm:py-3 text-sm sm:text-md text-orange-400 border-orange-400/50 hover:bg-orange-400/10 hover:text-orange-300 rounded-xl"
              >
                <SkipForward className="mr-1 sm:mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                Passer
              </Button>
            </motion.div>
          )}
        </div>
      )}
      
      <motion.div 
        className="pt-3" 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Button
          variant="destructive"
          onClick={onResetGame}
          className="text-red-300 border-red-400/50 bg-red-500/20 hover:bg-red-400/30 hover:text-red-200 px-4 py-2 text-sm"
        >
          <RefreshCw className="mr-2 h-4 w-4" />
          {isGameOver ? "Rejouer" : "Réinitialiser la partie en cours"}
        </Button>
      </motion.div>
    </div>
  );
};

export default GameControls;
