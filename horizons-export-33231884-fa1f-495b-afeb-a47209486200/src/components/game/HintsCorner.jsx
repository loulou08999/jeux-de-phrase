
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Lightbulb, HelpCircle } from 'lucide-react';
import { useGameConfig } from '@/hooks/useGameConfig';

const HintsCorner = () => {
  const [isOpen, setIsOpen] = useState(false);
  const gameConfig = useGameConfig();

  return (
    <>
      <div className="fixed bottom-4 left-4 z-50">
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(true)}
            variant="outline"
            size="icon"
            className="rounded-full bg-teal-600/80 hover:bg-teal-500 text-white border-teal-400/50 w-12 h-12 shadow-xl"
          >
            <Lightbulb className="h-6 w-6" />
          </Button>
        </motion.div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="bg-gradient-to-br from-slate-800 via-teal-900 to-slate-800 border-teal-700 text-white shadow-2xl shadow-teal-500/40 max-w-md">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
              >
                <DialogHeader className="text-center">
                  <div className="flex justify-center mb-3">
                    <HelpCircle className="w-12 h-12 text-teal-300" />
                  </div>
                  <DialogTitle className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-cyan-300 to-sky-400">
                    Coin des Indices Secrets
                  </DialogTitle>
                  <DialogDescription className="text-slate-300 mt-1">
                    Quelques pistes pour pimenter votre jeu...
                  </DialogDescription>
                </DialogHeader>

                <div className="my-5 space-y-3 max-h-[50vh] overflow-y-auto custom-scrollbar pr-2">
                  {gameConfig.HINTS && gameConfig.HINTS.length > 0 ? (
                    gameConfig.HINTS.map((hintItem, index) => (
                      <div key={index} className="p-3 bg-slate-700/60 rounded-lg border border-slate-600">
                        <p className="text-sm text-slate-200 leading-relaxed">
                          <span className="font-semibold text-teal-300">Indice : </span>{hintItem.hint}
                        </p>
                      </div>
                    ))
                  ) : (
                    <p className="text-slate-400 text-center">Aucun indice disponible pour le moment.</p>
                  )}
                </div>

                <DialogFooter className="mt-5">
                  <Button 
                    onClick={() => setIsOpen(false)} 
                    className="w-full bg-gradient-to-r from-teal-500 to-cyan-600 hover:from-teal-600 hover:to-cyan-700 text-white font-semibold py-2.5 rounded-md"
                  >
                    Compris !
                  </Button>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </>
  );
};

export default HintsCorner;
