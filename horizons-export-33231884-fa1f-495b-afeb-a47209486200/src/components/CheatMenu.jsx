
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { PlusCircle, Gift, Zap, User, Users, ChevronsRight, ChevronsLeft, Target, ShieldAlert, RefreshCcwDot, Crown, ThumbsUp, ThumbsDown, Sparkles, Trash2 } from 'lucide-react';
import { toast } from "@/components/ui/use-toast";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const CheatMenu = ({ 
  isOpen, 
  onClose, 
  onAddScore, 
  onSetScore,
  onAddJokers, 
  onResetJokers,
  onAddWord,
  onEndRound,
  onChangeRound,
  onTriggerSpecialEvent,
  onWinGame,
  onLoseGame,
  onFillSentence,
  onClearSentence,
  numPlayers
}) => {
  const [pointsToAdd, setPointsToAdd] = useState(100);
  const [scoreToSet, setScoreToSet] = useState(1000);
  const [jokersToAdd, setJokersToAdd] = useState(1);
  const [wordToAdd, setWordToAdd] = useState("");
  const [targetPlayer, setTargetPlayer] = useState("current"); 

  const showToast = (title, description, className = "", variant) => {
    toast({ title, description, className: className || "bg-slate-700 text-white", variant, duration: 3000 });
  };

  const handleAddScore = () => {
    if (typeof onAddScore === 'function') {
      onAddScore(Number(pointsToAdd), targetPlayer);
      showToast("Cheat: Points Ajoutés", `${pointsToAdd} points ajoutés. Cible: ${targetPlayer}.`, "bg-green-600 text-white border-none");
    }
  };

  const handleSetScore = () => {
    if (typeof onSetScore === 'function') {
      onSetScore(Number(scoreToSet), targetPlayer);
      showToast("Cheat: Score Défini", `Score défini à ${scoreToSet}. Cible: ${targetPlayer}.`, "bg-teal-600 text-white border-none");
    }
  };

  const handleAddJokers = () => {
    if (typeof onAddJokers === 'function') {
      onAddJokers(Number(jokersToAdd), targetPlayer);
      showToast("Cheat: Jokers Ajoutés", `${jokersToAdd} jokers de chaque type ajoutés. Cible: ${targetPlayer}.`, "bg-blue-600 text-white border-none");
    }
  };
  
  const handleResetJokers = () => {
    if (typeof onResetJokers === 'function') {
      onResetJokers(targetPlayer);
      showToast("Cheat: Jokers Réinitialisés", `Jokers réinitialisés. Cible: ${targetPlayer}.`, "bg-orange-600 text-white border-none");
    }
  };

  const handleAddWord = () => {
    if (wordToAdd.trim() && typeof onAddWord === 'function') {
      onAddWord(wordToAdd.trim(), targetPlayer);
      showToast("Cheat: Mot Ajouté", `Mot "${wordToAdd.trim()}" ajouté. Cible: ${targetPlayer}.`, "bg-yellow-500 text-black border-none");
      setWordToAdd("");
    } else if (!wordToAdd.trim()){
      showToast("Erreur", "Veuillez entrer un mot.", "", "destructive");
    }
  };

  const handleEndRound = () => {
    if (typeof onEndRound === 'function') {
      onEndRound();
      showToast("Cheat: Fin de Manche", "Manche actuelle terminée.", "bg-red-600 text-white border-none");
    }
  };

  const handleChangeRound = (delta) => {
    if (typeof onChangeRound === 'function') {
      onChangeRound(delta);
      showToast("Cheat: Manche Changée", `Navigation vers la manche ${delta > 0 ? 'suivante' : 'précédente'}.`, "bg-indigo-600 text-white border-none");
    }
  };

  const handleTriggerSpecialEvent = () => {
    if (typeof onTriggerSpecialEvent === 'function') {
      onTriggerSpecialEvent(targetPlayer);
      showToast("Cheat: Événement Spécial", `Événement "co00gui" déclenché. Cible: ${targetPlayer}.`, "bg-pink-600 text-white border-none");
    }
  };

  const handleWinGame = () => {
    if (typeof onWinGame === 'function') {
      onWinGame(targetPlayer);
      showToast("Cheat: Victoire Forcée", `Le joueur ciblé a gagné ! Cible: ${targetPlayer}.`, "bg-amber-500 text-white border-none");
    }
  };

  const handleLoseGame = () => {
    if (typeof onLoseGame === 'function') {
      onLoseGame(targetPlayer);
      showToast("Cheat: Défaite Forcée", `Le joueur ciblé a perdu. Cible: ${targetPlayer}.`, "bg-rose-700 text-white border-none");
    }
  };

  const handleFillSentence = () => {
    if (typeof onFillSentence === 'function') {
      onFillSentence();
      showToast("Cheat: Phrase Remplie", `La phrase du joueur actif est remplie.`, "bg-sky-500 text-white border-none");
    }
  };

  const handleClearSentence = () => {
    if (typeof onClearSentence === 'function') {
      onClearSentence();
      showToast("Cheat: Phrase Vidée", `La phrase du joueur actif est vidée.`, "bg-stone-500 text-white border-none");
    }
  };


  if (!isOpen) return null;

  const inputClass = "bg-slate-700 border-slate-600 text-white focus:ring-purple-500 placeholder-slate-400";
  const labelClass = "text-slate-300 font-semibold text-sm";
  
  const targetOptions = ["current", "player1"];
  if (numPlayers >= 2) targetOptions.push("player2");
  if (numPlayers >= 3) targetOptions.push("player3");
  if (numPlayers >= 4) targetOptions.push("player4");
  if (numPlayers > 1) targetOptions.push("all");


  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-xl bg-gradient-to-br from-slate-900 via-purple-950 to-slate-900 border-purple-700 text-slate-100 shadow-2xl shadow-purple-600/40">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400 flex items-center">
            <Zap className="mr-3 h-8 w-8 text-yellow-300" /> Panneau de Contrôle Divin
          </DialogTitle>
          <DialogDescription className="text-slate-400">
            Manipulez le destin du jeu à votre guise, ô grand architecte de l'absurde.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-5 py-4 max-h-[65vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-3 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <Label className={labelClass + " text-base text-purple-300"}>Cibler Joueur :</Label>
            <RadioGroup defaultValue="current" value={targetPlayer} onValueChange={setTargetPlayer} className="flex flex-wrap gap-x-4 gap-y-2">
              {targetOptions.map(val => (
                <div key={val} className="flex items-center space-x-2">
                  <RadioGroupItem value={val} id={`target-${val}`} className="text-purple-400 border-purple-400 focus:ring-purple-500" />
                  <Label htmlFor={`target-${val}`} className="text-slate-300 capitalize">
                    {val === "current" ? "Actif" : val === "all" ? "Tous" : val.replace("player", "Joueur ")}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Label htmlFor="points" className={labelClass}>Ajouter des Points</Label>
              <div className="flex items-center gap-2">
                <Input id="points" type="number" value={pointsToAdd} onChange={(e) => setPointsToAdd(Math.max(0, Number(e.target.value)))} className={inputClass} />
                <Button onClick={handleAddScore} className="bg-green-600 hover:bg-green-700 text-white w-full"><PlusCircle className="mr-2 h-4 w-4" />Ajouter</Button>
              </div>
            </div>

            <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Label htmlFor="setscore" className={labelClass}>Définir Score</Label>
              <div className="flex items-center gap-2">
                <Input id="setscore" type="number" value={scoreToSet} onChange={(e) => setScoreToSet(Math.max(0, Number(e.target.value)))} className={inputClass} />
                <Button onClick={handleSetScore} className="bg-teal-600 hover:bg-teal-700 text-white w-full"><Target className="mr-2 h-4 w-4" />Définir</Button>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Label htmlFor="jokers" className={labelClass}>Ajouter des Jokers</Label>
              <div className="flex items-center gap-2">
                <Input id="jokers" type="number" value={jokersToAdd} onChange={(e) => setJokersToAdd(Math.max(0, Number(e.target.value)))} className={inputClass} />
                <Button onClick={handleAddJokers} className="bg-blue-600 hover:bg-blue-700 text-white w-full"><Gift className="mr-2 h-4 w-4" />Obtenir</Button>
              </div>
            </div>
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex flex-col justify-center">
               <Label className={labelClass}>Réinitialiser Jokers</Label>
               <Button onClick={handleResetJokers} className="bg-orange-600 hover:bg-orange-700 text-white mt-2"><RefreshCcwDot className="mr-2 h-4 w-4" />Réinitialiser</Button>
            </div>
          </div>
          
          <div className="space-y-2 p-3 bg-slate-800/50 rounded-lg border border-slate-700">
            <Label htmlFor="word" className={labelClass}>Ajouter un Mot Spécifique (au joueur actif)</Label>
            <div className="flex items-center gap-2">
              <Input id="word" type="text" value={wordToAdd} onChange={(e) => setWordToAdd(e.target.value)} placeholder="Votre mot..." className={inputClass} />
              <Button onClick={handleAddWord} className="bg-yellow-500 hover:bg-yellow-600 text-black w-full"><Zap className="mr-2 h-4 w-4" />Créer</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Label className={labelClass}>Contrôle de Manche</Label>
              <div className="flex gap-2 mt-2">
                <Button onClick={() => handleChangeRound(-1)} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full"><ChevronsLeft className="mr-1 h-4 w-4" />Préc.</Button>
                <Button onClick={() => handleChangeRound(1)} className="bg-indigo-600 hover:bg-indigo-700 text-white w-full">Suiv.<ChevronsRight className="ml-1 h-4 w-4" /></Button>
              </div>
              <Button onClick={handleEndRound} className="bg-red-600 hover:bg-red-700 text-white w-full mt-2"><ShieldAlert className="mr-2 h-4 w-4" />Terminer Manche</Button>
            </div>
             <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700 flex flex-col justify-center">
               <Label className={labelClass}>Événement Spécial "co00gui"</Label>
               <Button onClick={handleTriggerSpecialEvent} className="bg-pink-600 hover:bg-pink-700 text-white mt-2"><Crown className="mr-2 h-4 w-4" />Déclencher</Button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
              <Label className={labelClass}>Contrôle de Partie</Label>
              <div className="flex gap-2 mt-2">
                <Button onClick={handleWinGame} className="bg-amber-500 hover:bg-amber-600 text-white w-full"><ThumbsUp className="mr-1 h-4 w-4" />Gagner</Button>
                <Button onClick={handleLoseGame} className="bg-rose-700 hover:bg-rose-800 text-white w-full">Perdre<ThumbsDown className="ml-1 h-4 w-4" /></Button>
              </div>
            </div>
             <div className="p-3 bg-slate-800/50 rounded-lg border border-slate-700">
               <Label className={labelClass}>Contrôle de Phrase (joueur actif)</Label>
               <div className="flex gap-2 mt-2">
                <Button onClick={handleFillSentence} className="bg-sky-500 hover:bg-sky-600 text-white w-full"><Sparkles className="mr-1 h-4 w-4" />Remplir</Button>
                <Button onClick={handleClearSentence} className="bg-stone-500 hover:bg-stone-600 text-white w-full">Vider<Trash2 className="ml-1 h-4 w-4" /></Button>
              </div>
            </div>
          </div>

        </div>

        <DialogFooter className="sm:justify-center mt-6">
          <Button onClick={onClose} variant="outline" className="border-purple-500 text-purple-400 hover:bg-purple-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105">
            Fermer le Panneau Divin
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CheatMenu;
