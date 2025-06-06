
import React from 'react';
import { motion } from 'framer-motion';
import { User, Zap, Star, Edit3, Crown } from 'lucide-react';
import { Button } from "@/components/ui/button";

const PlayerDisplay = ({ playerName, playerNumber, score, isActive, history, jokers, onUseJoker, currentRound, totalRounds, showSpecialEventEffect, numPlayers }) => {
  const activeColor = playerNumber === 1 ? "from-pink-500 to-purple-600" : "from-blue-500 to-teal-500";
  const inactiveColor = "bg-white/10";
  
  const specialEventStyle = showSpecialEventEffect && isActive ? 
    "bg-gradient-to-br from-red-600 via-orange-500 to-yellow-400 border-amber-300 ring-4 ring-yellow-400 ring-opacity-75 shadow-2xl shadow-red-500/50" :
    (isActive ? `border-yellow-400 ${activeColor}` : `${inactiveColor} border-white/20`);

  const displayName = playerName || `Joueur ${playerNumber}`;

  return (
    <motion.div
      className={`p-4 md:p-6 rounded-xl shadow-xl border transition-all duration-500 flex flex-col ${specialEventStyle}`}
      initial={{ opacity: 0.7, scale: 0.95 }}
      animate={{ 
        opacity: isActive || numPlayers === 1 ? 1 : 0.7, 
        scale: isActive || numPlayers === 1 ? (showSpecialEventEffect ? 1.05 : 1) : 0.95,
      }}
      transition={{ type: "spring", stiffness: 300, damping: showSpecialEventEffect ? 10 : 20 }}
    >
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <User className={`w-7 h-7 md:w-8 md:h-8 mr-2 md:mr-3 ${(isActive || numPlayers === 1) ? (showSpecialEventEffect ? 'text-yellow-200' : 'text-yellow-300') : 'text-white/70'}`} />
          <h2 className={`text-xl md:text-2xl font-bold ${(isActive || numPlayers === 1) ? 'text-white' : 'text-white/80'}`}>
            {displayName}
          </h2>
        </div>
        {(isActive || numPlayers === 1) && showSpecialEventEffect && <Crown className="w-7 h-7 text-yellow-200 animate-bounce" />}
        {(isActive || numPlayers === 1) && !showSpecialEventEffect && <Zap className="w-5 h-5 md:w-6 md:h-6 text-yellow-300 animate-pulse" />}
      </div>
      <p className={`text-3xl md:text-4xl font-bold mb-3 text-center ${(isActive || numPlayers === 1) ? 'text-white' : 'text-white/80'}`}>
        Score: {score}
      </p>
      
      { (isActive || numPlayers === 1) && currentRound <= totalRounds && (
        <div className="mb-3 space-y-2">
          <h4 className="text-sm font-medium text-center text-white/80 mb-1">Jokers restants :</h4>
          <div className="flex justify-center space-x-2">
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUseJoker('customWord')} 
              disabled={jokers.customWord === 0}
              className={`text-xs px-2 py-1 ${jokers.customWord > 0 ? (showSpecialEventEffect ? 'border-yellow-200 text-yellow-200 hover:bg-yellow-200/20' : 'border-yellow-400 text-yellow-400 hover:bg-yellow-400/10') : 'border-gray-500 text-gray-500 opacity-50'}`}
            >
              <Star className="w-3 h-3 mr-1" /> Mot ({jokers.customWord})
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={() => onUseJoker('customPhrase')} 
              disabled={jokers.customPhrase === 0}
              className={`text-xs px-2 py-1 ${jokers.customPhrase > 0 ? (showSpecialEventEffect ? 'border-yellow-200 text-yellow-200 hover:bg-yellow-200/20' : 'border-green-400 text-green-400 hover:bg-green-400/10') : 'border-gray-500 text-gray-500 opacity-50'}`}
            >
              <Edit3 className="w-3 h-3 mr-1" /> Phrase ({jokers.customPhrase})
            </Button>
          </div>
        </div>
      )}

      {history && history.length > 0 && (
        <div className="mt-auto">
          <h3 className={`text-xs md:text-sm font-medium mb-1 ${(isActive || numPlayers === 1) ? 'text-white/90' : 'text-white/70'}`}>Dernières phrases :</h3>
          <ul className="space-y-1 text-xs">
            {history.map((item, index) => (
              <li key={index} className={`p-1.5 rounded ${showSpecialEventEffect && (isActive || numPlayers === 1) ? 'bg-red-700/50' : 'bg-black/20'} ${(isActive || numPlayers === 1) ? 'text-white/80' : 'text-white/60'} flex justify-between text-[10px] md:text-xs`}>
                <span className="truncate max-w-[70%]">"{item.text}"</span>
                <span className="font-semibold whitespace-nowrap">{item.score} pts</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
};

export default PlayerDisplay;
