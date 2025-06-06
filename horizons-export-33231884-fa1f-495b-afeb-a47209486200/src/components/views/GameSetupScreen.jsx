
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Users, User, PlayCircle } from 'lucide-react';
import BackgroundAnimations from '@/components/layout/BackgroundAnimations';
import { toast } from "@/components/ui/use-toast";

const GameSetupScreen = ({ onSetupComplete }) => {
  const [numPlayers, setNumPlayers] = useState(2);
  const [playerNames, setPlayerNames] = useState({
    player1: "Joueur 1",
    player2: "Joueur 2",
    player3: "Joueur 3",
    player4: "Joueur 4",
  });

  const handleNameChange = (playerKey, value) => {
    setPlayerNames(prev => ({ ...prev, [playerKey]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    for (let i = 1; i <= numPlayers; i++) {
      if (!playerNames[`player${i}`].trim()) {
        toast({ title: "Nom manquant", description: `Veuillez entrer un nom pour le Joueur ${i}.`, variant: "destructive"});
        return;
      }
    }
    
    const finalPlayerNames = {};
    for (let i = 1; i <= numPlayers; i++) {
      finalPlayerNames[`player${i}`] = playerNames[`player${i}`].trim() || `Joueur ${i}`;
    }
    for (let i = numPlayers + 1; i <= 4; i++) {
      finalPlayerNames[`player${i}`] = ""; 
    }

    onSetupComplete({
      numPlayers,
      playerNames: finalPlayerNames,
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white p-4 relative overflow-hidden">
      <BackgroundAnimations />
      <motion.div
        initial={{ opacity: 0, y: -50, scale: 0.8 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, type: "spring", stiffness: 120 }}
        className="relative z-10 bg-slate-800/70 backdrop-blur-md p-6 sm:p-10 rounded-2xl shadow-2xl shadow-purple-500/30 w-full max-w-xl border border-purple-700/50"
      >
        <div className="text-center mb-8">
          <motion.h1 
            className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 mb-3"
            initial={{ letterSpacing: "-0.05em" }}
            animate={{ letterSpacing: "0em" }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Construteur de Phrases Absurdes
          </motion.h1>
          <p className="text-slate-300 text-lg">Configuration de la Partie</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div 
            className="space-y-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Label htmlFor="numPlayers" className="text-lg font-semibold text-purple-300 flex items-center"><Users className="mr-2 h-5 w-5" />Nombre de Joueurs</Label>
            <RadioGroup
              id="numPlayers"
              defaultValue="2"
              value={String(numPlayers)}
              onValueChange={(value) => setNumPlayers(Number(value))}
              className="flex flex-wrap gap-x-4 gap-y-2 pt-2"
            >
              {[1, 2, 3, 4].map(val => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={String(val)} id={`num-${val}`} className="text-purple-400 border-purple-400 focus:ring-purple-500 transform hover:scale-110 transition-transform" />
                  <Label htmlFor={`num-${val}`} className="text-slate-200 text-md cursor-pointer">{val} Joueur{val > 1 ? 's' : ''}</Label>
                </div>
              ))}
            </RadioGroup>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
            {Array.from({ length: numPlayers }, (_, i) => (
              <motion.div 
                key={`player-input-${i+1}`}
                className="space-y-2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 + (i * 0.1) }}
              >
                <Label htmlFor={`player${i+1}Name`} className="text-md font-semibold text-purple-300 flex items-center"><User className="mr-2 h-4 w-4" />Nom Joueur {i+1}</Label>
                <Input
                  id={`player${i+1}Name`}
                  type="text"
                  value={playerNames[`player${i+1}`]}
                  onChange={(e) => handleNameChange(`player${i+1}`, e.target.value)}
                  className="bg-slate-700/80 border-slate-600 text-white placeholder-slate-400 focus:ring-purple-500 focus:border-purple-500 py-2.5 px-3 text-sm rounded-lg"
                  placeholder={`Ex: Génie ${i+1}`}
                />
              </motion.div>
            ))}
          </div>
          

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 + (numPlayers * 0.1) }}
            className="pt-4"
          >
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-white font-bold py-3 text-lg rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 ease-in-out"
            >
              <PlayCircle className="mr-3 h-6 w-6" /> Lancer la Partie !
            </Button>
          </motion.div>
        </form>
      </motion.div>
      
      <motion.p 
        className="absolute bottom-6 text-center text-sm text-slate-500 z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        Préparez-vous pour une aventure linguistique délirante !
      </motion.p>
    </div>
  );
};

export default GameSetupScreen;
