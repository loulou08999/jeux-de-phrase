
import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Users, ListOrdered, Zap, UserCheck } from 'lucide-react';

const Header = ({ currentRound, totalRounds, currentPlayerName, isGameOver, numPlayers }) => {
  const progressPercent = totalRounds > 0 ? (currentRound / totalRounds) * 100 : 0;

  return (
    <header className="py-4 px-2 sm:px-0">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="text-center mb-3"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
          Le Construteur de Phrases Absurdes
        </h1>
        <p className="text-sm text-slate-400">Édition Duo Ultime</p>
      </motion.div>

      {!isGameOver && totalRounds > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="my-3 bg-slate-700/50 p-3 rounded-lg shadow-md max-w-2xl mx-auto"
        >
          <div className="flex justify-between items-center text-sm text-slate-300 mb-1 px-1">
            <span className="flex items-center"><ListOrdered size={16} className="mr-1.5 text-purple-400" /> Manche {currentRound} / {totalRounds}</span>
            {numPlayers > 1 ? (
                <span className="flex items-center"><UserCheck size={16} className="mr-1.5 text-green-400" /> Au tour de : <strong className="ml-1 text-white">{currentPlayerName}</strong></span>
            ) : (
                 <span className="flex items-center"><UserCheck size={16} className="mr-1.5 text-green-400" /> <strong className="ml-1 text-white">{currentPlayerName}</strong> est en train de jouer.</span>
            )}
          </div>
          <div className="w-full bg-slate-600 rounded-full h-2.5 overflow-hidden">
            <motion.div
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            />
          </div>
        </motion.div>
      )}

      {isGameOver && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
          className="text-center my-5 p-4 bg-gradient-to-r from-green-500 to-teal-600 rounded-lg shadow-xl max-w-md mx-auto"
        >
          <h2 className="text-2xl font-bold text-white flex items-center justify-center">
            <Trophy className="mr-2 text-yellow-300" size={28} />
            Partie Terminée !
          </h2>
        </motion.div>
      )}
    </header>
  );
};

export default Header;
