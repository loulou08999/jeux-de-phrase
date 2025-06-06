
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { List, X, Search } from 'lucide-react';

const AllWordsPanel = ({ allWords, availableWords }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const availableWordTexts = availableWords.map(w => w.text);

  const filteredWords = useMemo(() => {
    if (!searchTerm) {
      return allWords;
    }
    return allWords.filter(word =>
      word.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [allWords, searchTerm]);

  return (
    <>
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed top-28 right-4 z-40 bg-purple-600 hover:bg-purple-700 text-white shadow-lg"
        size="icon"
        aria-label="Ouvrir le panneau de tous les mots"
      >
        <List />
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed top-0 right-0 h-full w-full sm:w-96 bg-slate-800/95 backdrop-blur-lg shadow-2xl z-50 p-6 flex flex-col"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold text-purple-300">Tous les Mots du Jeu</h2>
              <Button onClick={() => setIsOpen(false)} variant="ghost" size="icon" aria-label="Fermer le panneau">
                <X className="text-slate-300 hover:text-white" />
              </Button>
            </div>
            <div className="relative mb-4">
              <Input
                type="text"
                placeholder="Rechercher un mot..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-slate-700 border-slate-600 placeholder-slate-400 text-white pl-10"
                aria-label="Rechercher parmi tous les mots"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            </div>
            <div className="overflow-y-auto flex-grow pr-2 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-slate-700">
              {filteredWords.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {filteredWords.map((word, index) => (
                    <motion.div
                      key={index}
                      className={`p-2 rounded-md text-sm text-center transition-all duration-150
                        ${availableWordTexts.includes(word) 
                          ? 'bg-green-500/90 text-white font-semibold ring-2 ring-green-300 shadow-md' 
                          : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                        }`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.01, duration: 0.2 }}
                      layout
                    >
                      {word}
                    </motion.div>
                  ))}
                </div>
              ) : (
                <p className="text-slate-400 text-center mt-8">Aucun mot ne correspond à votre recherche.</p>
              )}
            </div>
            <p className="mt-4 text-xs text-slate-400 text-center">
              Les mots en <span className="text-green-400 font-semibold">vert</span> sont actuellement disponibles.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AllWordsPanel;
