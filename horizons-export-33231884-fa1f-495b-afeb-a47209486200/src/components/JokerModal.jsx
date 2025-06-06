
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const JokerModal = ({ isOpen, onClose, onUseJoker, jokerType }) => {
  const [inputValue, setInputValue] = useState("");

  const handleSubmit = () => {
    if (inputValue.trim() === "" && jokerType !== "skipTurn") {
      alert("Veuillez entrer une valeur.");
      return;
    }
    onUseJoker(jokerType, inputValue);
    setInputValue("");
    onClose();
  };

  const title = jokerType === "customWord" ? "Joker : Mot Libre" : "Joker : Phrase Libre";
  const description = jokerType === "customWord" 
    ? "Entrez le mot que vous souhaitez ajouter à votre phrase." 
    : "Écrivez la phrase absurde de votre choix. Elle sera notée directement.";
  const inputLabel = jokerType === "customWord" ? "Votre mot personnalisé" : "Votre phrase libre";
  const buttonText = jokerType === "customWord" ? "Ajouter le mot" : "Soumettre la phrase";

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-slate-800 border-slate-700 text-white">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="joker-input" className="text-right">
              {inputLabel}
            </Label>
            <Input
              id="joker-input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="col-span-3 bg-slate-700 border-slate-600 placeholder-slate-400"
              placeholder={jokerType === "customWord" ? "Ex: Kangourou" : "Ex: Le chat pilote un avion..."}
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="text-slate-300 border-slate-600 hover:bg-slate-700">Annuler</Button>
          </DialogClose>
          <Button onClick={handleSubmit} className="bg-purple-600 hover:bg-purple-700">{buttonText}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default JokerModal;
