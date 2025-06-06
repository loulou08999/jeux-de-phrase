
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Trophy, RotateCcw, Users, Award } from 'lucide-react';

const GameOverDialog = ({ isOpen, onClose, playersState, onResetGame, numPlayers }) => {
  let winnerMessage = "";
  let winningPlayer = null;
  let isTie = false;

  if (numPlayers === 1) {
    winnerMessage = "Partie Solo Terminée !";
    winningPlayer = playersState[0];
  } else {
    const sortedPlayers = [...playersState].sort((a, b) => b.score - a.score);
    if (sortedPlayers[0].score > sortedPlayers[1].score) {
      winningPlayer = sortedPlayers[0];
      winnerMessage = `Félicitations, ${winningPlayer.name} !`;
    } else if (sortedPlayers.every(p => p.score === sortedPlayers[0].score)) {
      isTie = true;
      winnerMessage = "Égalité Parfaite !";
    } else {
      const topScore = sortedPlayers[0].score;
      const winners = sortedPlayers.filter(p => p.score === topScore);
      if (winners.length > 1) {
        isTie = true;
        winnerMessage = `Égalité entre ${winners.map(w => w.name).join(' et ')} !`;
      } else {
        winningPlayer = winners[0];
        winnerMessage = `Félicitations, ${winningPlayer.name} !`;
      }
    }
  }


  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onOpenChange={onClose}>
          <DialogContent className="bg-gradient-to-br from-slate-800 via-purple-900 to-slate-800 border-purple-700 text-white shadow-2xl shadow-purple-500/40 max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.7 }}
              transition={{ duration: 0.3 }}
            >
              <DialogHeader className="text-center">
                <div className="flex justify-center mb-4">
                  <Trophy className="w-16 h-16 text-yellow-400 animate-pulse" />
                </div>
                <DialogTitle className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
                  Partie Terminée !
                </DialogTitle>
                {winnerMessage && <DialogDescription className="text-slate-300 text-lg mt-2">{winnerMessage}</DialogDescription>}
              </DialogHeader>

              <div className="my-6 space-y-3 px-2 max-h-[40vh] overflow-y-auto custom-scrollbar">
                {playersState.map((player, index) => (
                  <div 
                    key={index} 
                    className={`p-3 rounded-lg flex justify-between items-center transition-all duration-300
                                ${winningPlayer && player.name === winningPlayer.name && !isTie ? 'bg-yellow-500/20 border border-yellow-400 shadow-lg shadow-yellow-500/30 scale-105' 
                                : isTie && player.score === playersState[0].score ? 'bg-teal-500/20 border border-teal-400' 
                                : 'bg-slate-700/50 border border-slate-600'}`}
                  >
                    <div className="flex items-center">
                      {winningPlayer && player.name === winningPlayer.name && !isTie && <Award className="w-5 h-5 mr-2 text-yellow-400" />}
                      <p className={`text-lg font-semibold ${winningPlayer && player.name === winningPlayer.name && !isTie ? 'text-yellow-300' : 'text-slate-200'}`}>{player.name}</p>
                    </div>
                    <p className={`text-2xl font-bold ${winningPlayer && player.name === winningPlayer.name && !isTie ? 'text-yellow-300' : 'text-slate-100'}`}>
                      {player.score} <span className="text-lg text-slate-300">pts</span>
                    </p>
                  </div>
                ))}
                {isTie && (
                  <p className="text-lg font-medium text-teal-300 mt-3 text-center">Vous êtes tous des génies de l'absurde !</p>
                )}
              </div>

              <DialogFooter className="flex flex-col sm:flex-row sm:justify-center gap-3 mt-4">
                <Button 
                  onClick={onResetGame} 
                  className="w-full sm:w-auto bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-lg shadow-md hover:shadow-lg transition-all transform hover:scale-105"
                >
                  <RotateCcw className="mr-2 h-5 w-5" /> Rejouer
                </Button>
                <Button 
                  variant="outline" 
                  onClick={onClose} 
                  className="w-full sm:w-auto border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white py-3 px-6 rounded-lg transition-all"
                >
                  Fermer
                </Button>
              </DialogFooter>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default GameOverDialog;
