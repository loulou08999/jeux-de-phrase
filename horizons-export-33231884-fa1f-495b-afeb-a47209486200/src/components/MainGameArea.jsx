
import React from 'react';
import { motion, AnimatePresence, Reorder } from 'framer-motion';
import DropZone from "@/components/DropZone";
import AbsurdityMeter from "@/components/AbsurdityMeter";

const MainGameArea = ({
  availableWords,
  sentenceWords,
  currentSentence,
  absurdityScore,
  isDragging,
  draggedItemInfo, 
  onWordDragStart,
  handleActualDragEnd, 
  handleDropInAvailable,
  handleDropInSentence,
  setSentenceWords,
  currentPlayer,
  currentRound,
  totalRounds
}) => {
  const isGameActive = currentRound <= totalRounds;

  return (
    <div className="space-y-6 mb-8">
      {isGameActive && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-1 text-center">
            Mots disponibles <span className="text-sm text-white/60">({(Array.isArray(availableWords) ? availableWords : []).length})</span>
          </h2>
          <p className="text-center text-sm text-white/70 mb-3">Joueur {currentPlayer}, piochez vos mots !</p>
          <DropZone 
            onDrop={handleDropInAvailable} 
            isOver={isDragging && !!draggedItemInfo && (Array.isArray(sentenceWords) ? sentenceWords : []).some(w => w.id === draggedItemInfo.id)}
            zoneId="available"
          >
            <AnimatePresence>
              {(Array.isArray(availableWords) ? availableWords : []).map(word => (
                <motion.div
                  key={`available-${word.id}`}
                  layoutId={`available-${word.id}`}
                  draggable
                  onDragStart={(e) => onWordDragStart(e, word, "available")}
                  onDragEnd={(e, info) => handleActualDragEnd(e, info, word.id)}
                  className="word-card px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base bg-gradient-to-r from-teal-500 to-cyan-600 text-white font-medium rounded-lg cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all m-1"
                  whileHover={{ scale: 1.1, y: -5 }}
                  whileTap={{ scale: 0.95, boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {word.text}
                </motion.div>
              ))}
            </AnimatePresence>
          </DropZone>
        </div>
      )}

      {isGameActive && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-3 text-center">
            Phrase du Joueur {currentPlayer} <span className="text-sm text-white/60">({(Array.isArray(sentenceWords) ? sentenceWords : []).length} mots)</span>
          </h2>
          <DropZone 
            onDrop={handleDropInSentence} 
            isOver={isDragging && !!draggedItemInfo && (Array.isArray(availableWords) ? availableWords : []).some(w => w.id === draggedItemInfo.id)}
            zoneId="sentence"
          >
            <Reorder.Group
              axis="x"
              values={Array.isArray(sentenceWords) ? sentenceWords : []}
              onReorder={setSentenceWords}
              className="flex flex-wrap gap-1 md:gap-2 justify-center min-h-[40px] md:min-h-[50px]"
            >
              <AnimatePresence>
                {(Array.isArray(sentenceWords) ? sentenceWords : []).map(word => (
                  <Reorder.Item
                    key={`sentence-${word.id}`}
                    value={word}
                    id={`sentence-${word.id}`}
                    draggable
                    onDragStart={(e) => onWordDragStart(e, word, "sentence")}
                    onDragEnd={(e, info) => handleActualDragEnd(e, info, word.id)}
                    className={`word-card px-3 py-1.5 md:px-4 md:py-2 text-sm md:text-base font-medium rounded-lg cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all ${word.isJoker ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-black' : 'bg-gradient-to-r from-pink-500 to-purple-600 text-white'}`}
                    whileHover={{ scale: 1.1, y: -5 }}
                    whileTap={{ scale: 0.95, boxShadow: "0px 2px 5px rgba(0,0,0,0.2)" }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {word.text}
                  </Reorder.Item>
                ))}
              </AnimatePresence>
            </Reorder.Group>
          </DropZone>
        </div>
      )}
      
      {currentSentence && absurdityScore > 0 && <AbsurdityMeter score={absurdityScore} />}
      
      {!isGameActive && (
        <motion.div 
          className="text-center p-8 bg-white/10 rounded-xl"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-yellow-400">Partie Terminée !</h2>
          <p className="text-white/80 mt-2">Cliquez sur "Rejouer" pour une nouvelle aventure absurde.</p>
        </motion.div>
      )}
    </div>
  );
};

export default MainGameArea;
