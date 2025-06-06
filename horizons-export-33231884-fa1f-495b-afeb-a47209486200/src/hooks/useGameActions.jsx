
import React from 'react';
import { toast } from "@/components/ui/use-toast";
import { getRandomWords, calculateAbsurdityScore } from "@/lib/wordUtils";

export const useGameActions = (state, setState, config, gameSettings, onResetToSetup) => {
  const {
    currentPlayer, sentenceWords, currentRound, availableWords, numPlayers
  } = state;
  const { INITIAL_JOKERS, MAX_HISTORY_PER_PLAYER, TOTAL_ROUNDS, JOKER_WIN_THRESHOLD, JOKER_WIN_CHANCE, AVAILABLE_WORDS_COUNT, SPECIAL_EVENT_WORD, SPECIAL_EVENT_POINTS } = config;

  const showSuccessToast = (title, description) => {
    toast({ title, description, className: "bg-green-500 text-white", duration: 3000});
  };
  const showErrorToast = (title, description) => {
    toast({ title, description, variant: "destructive", duration: 3000});
  };
   const showInfoToast = (title, description) => {
    toast({ title, description, className:"bg-blue-500 text-white", duration: 3000});
  };

  const applyToTargetPlayer = (target, action) => {
    const targets = [];
    if (target === "current") {
      targets.push(currentPlayer);
    } else if (target === "all") {
      for (let i = 1; i <= numPlayers; i++) targets.push(i);
    } else if (target.startsWith("player")) {
      const playerNum = parseInt(target.replace("player", ""), 10);
      if (playerNum >= 1 && playerNum <= numPlayers) {
        targets.push(playerNum);
      }
    } else if (target === "both" && numPlayers === 2) { 
        targets.push(1,2);
    }


    targets.forEach(playerNum => {
      action(playerNum);
    });
  };

  const awardSpecificJokers = (count, targetPlayer = "current") => {
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Jokers`](prev => ({ customWord: (prev.customWord ?? 0) + count, customPhrase: (prev.customPhrase ?? 0) + count }));
    });
  };
  
  const resetPlayerJokers = (targetPlayer = "current") => {
    const initialJokerConfig = INITIAL_JOKERS || { customWord: 1, customPhrase: 1 };
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Jokers`]({...initialJokerConfig});
    });
  };


  const awardJokerRandomly = () => {
    const setJokers = setState[`setPlayer${currentPlayer}Jokers`];
    const jokerTypeToAward = Math.random() < 0.5 ? "customWord" : "customPhrase";
    setJokers(prev => ({ ...prev, [jokerTypeToAward]: (prev[jokerTypeToAward] ?? 0) + 1 }));
    toast({
      title: "🎉 Joker Gagné ! 🎉",
      description: `Félicitations ! Vous avez gagné un joker "${jokerTypeToAward === "customWord" ? "Mot Libre" : "Phrase Libre"}" !`,
      className: "bg-yellow-500 border-yellow-700 text-black",
      duration: 4000,
    });
  };

  const triggerSpecialEventUI = (targetPlayer = "current") => {
     applyToTargetPlayer(targetPlayer, (playerNum) => {
        setState[`setPlayer${playerNum}SpecialEffect`](true);
        setTimeout(() => setState[`setPlayer${playerNum}SpecialEffect`](false), 5000);
      });
  };

  const addSpecialWordToAvailable = (wordText, targetPlayer = "current", isCheat = false) => {
    const newWord = { id: `${isCheat ? 'cheat' : 'special'}-${wordText}-${Date.now()}`, text: wordText, isSpecial: !isCheat, isCheatWord: isCheat };
    
    const action = (prevAvailableWords) => {
        const currentWords = Array.isArray(prevAvailableWords) ? prevAvailableWords : [];
        if (!currentWords.find(w => w.text === wordText)) {
            return [newWord, ...currentWords];
        }
        return currentWords;
    };
    
    if (targetPlayer === "current" || targetPlayer.startsWith("player")) {
        const playerNumToTarget = targetPlayer === "current" ? currentPlayer : parseInt(targetPlayer.replace("player", ""), 10);
        if (playerNumToTarget === currentPlayer) {
            setState.setAvailableWords(prev => action(prev));
        } else {
            showInfoToast("Info", `Le mot "${wordText}" sera disponible pour ${state[`player${playerNumToTarget}Name`]} à son prochain tour.`);
        }
    } else if (targetPlayer === "all" || (targetPlayer === "both" && numPlayers === 2)) {
        setState.setAvailableWords(prev => action(prev));
    } else {
         setState.setAvailableWords(prev => action(prev));
    }
  };


  const endTurnInternal = (currentScore, megaBonusAwarded, specialEventTriggered, forced = false) => {
    if (!forced && !megaBonusAwarded && !specialEventTriggered && currentScore >= JOKER_WIN_THRESHOLD && Math.random() < JOKER_WIN_CHANCE) {
      awardJokerRandomly();
    }

    let nextPlayer = currentPlayer;
    let nextRound = currentRound;

    if (numPlayers > 1) {
      nextPlayer = currentPlayer === numPlayers ? 1 : currentPlayer + 1;
      if (nextPlayer === 1) { 
        nextRound = currentRound + 1;
      }
    } else { 
      nextRound = currentRound + 1;
    }
    
    for(let i=1; i <= numPlayers; i++) {
        if (state[`player${i}SpecialEffect`] && i !== nextPlayer) {
            setState[`setPlayer${i}SpecialEffect`](false);
        }
    }


    if (nextRound > TOTAL_ROUNDS && TOTAL_ROUNDS > 0 && !forced) { 
      setState.setIsGameOver(true);
      showInfoToast("Partie terminée !", "Les résultats sont affichés.");
    } else {
      setState.setCurrentPlayer(nextPlayer);
      setState.setCurrentRound(nextRound);
      setState.setSentenceWords([]);
      if (AVAILABLE_WORDS_COUNT > 0) { 
         setState.setAvailableWords(getRandomWords(AVAILABLE_WORDS_COUNT));
      } else {
         setState.setAvailableWords([]);
      }
      setState.setCurrentSentence("");
      setState.setAbsurdityScore(0);
      if (!forced) showInfoToast(`Manche ${nextRound} - ${state[`player${nextPlayer}Name`] || `Joueur ${nextPlayer}`}`, "À vous de jouer !");
    }
  };

  const submitSentenceInternal = (wordsToScore, isCustom) => {
    const newSentence = wordsToScore.map(w => w.text || w).join(" ");
    setState.setCurrentSentence(newSentence);

    const { score, penalties, bonuses, megaBonusAwarded, specialEventTriggered } = calculateAbsurdityScore(wordsToScore, isCustom, toast, () => awardSpecificJokers(10, "current"), () => triggerSpecialEventUI("current"), config);
    setState.setAbsurdityScore(score);
    
    const playerName = state[`player${currentPlayer}Name`] || `Joueur ${currentPlayer}`;

    setState[`setPlayer${currentPlayer}Score`](prev => prev + score);
    setState[`setPlayer${currentPlayer}History`](prev => [{ text: newSentence, score }, ...prev.slice(0, MAX_HISTORY_PER_PLAYER - 1)]);
    
    showSuccessToast(`Phrase de ${playerName} soumise !`, `Votre phrase "${newSentence}" a obtenu un score de ${score} !`);
    
    endTurnInternal(score, megaBonusAwarded, specialEventTriggered);
  };

  const submitSentence = () => {
    if (sentenceWords.length === 0) {
      showErrorToast("Phrase vide !", "Veuillez construire une phrase avec les mots disponibles.");
      return;
    }
    submitSentenceInternal(sentenceWords, false);
  };
  
  const openJokerModal = (type) => {
    const jokers = state[`player${currentPlayer}Jokers`];
    if (jokers && jokers[type] > 0) {
      setState.setCurrentJokerType(type);
      setState.setIsJokerModalOpen(true);
    } else {
      showErrorToast("Joker épuisé", `Vous n'avez plus de joker "${type === "customWord" ? "Mot Libre" : "Phrase Libre"}".`);
    }
  };

  const handleUseJoker = (type, value) => {
    const currentJokers = state[`player${currentPlayer}Jokers`];
    const setJokers = setState[`setPlayer${currentPlayer}Jokers`];

    if (currentJokers && currentJokers[type] > 0) {
      setJokers(prev => ({ ...prev, [type]: (prev[type] ?? 0) - 1 }));
      if (type === "customWord") {
        const newWord = { id: `joker-${Date.now()}`, text: value, isJoker: true };
        setState.setSentenceWords(prev => [...(Array.isArray(prev) ? prev : []), newWord]);
        showSuccessToast("Joker Mot Libre utilisé!", `Le mot "${value}" a été ajouté.`);
      } else if (type === "customPhrase") {
        const wordsArray = value.split(" ").map(w => ({ text: w, isJoker: true }));
        submitSentenceInternal(wordsArray, true);
      }
    }
    setState.setIsJokerModalOpen(false);
    setState.setCurrentJokerType(null);
  };

  const refreshWordsForNewTurn = () => {
    if (AVAILABLE_WORDS_COUNT > 0) {
      setState.setAvailableWords(getRandomWords(AVAILABLE_WORDS_COUNT));
    } else {
      setState.setAvailableWords([]);
    }
    setState.setSentenceWords([]);
    setState.setCurrentSentence("");
    setState.setAbsurdityScore(0);
    const playerName = state[`player${currentPlayer}Name`] || `Joueur ${currentPlayer}`;
    showInfoToast(`Mots rafraîchis pour ${playerName}`, "De nouveaux mots sont disponibles.");
  };
  
  const skipTurn = () => {
    const playerName = state[`player${currentPlayer}Name`] || `Joueur ${currentPlayer}`;
    showInfoToast(`${playerName} passe son tour.`, `Aucun point marqué pour cette manche.`);
    setState[`setPlayer${currentPlayer}SpecialEffect`](false);
    endTurnInternal(0, false, false); 
  };

  const resetGame = (switchToSetup = false) => {
    if (state.isGameOver || window.confirm("Êtes-vous sûr de vouloir réinitialiser la partie ? Les scores, manches et jokers seront perdus.")) {
      if (switchToSetup && typeof onResetToSetup === 'function') {
        onResetToSetup();
        return;
      }
      if (AVAILABLE_WORDS_COUNT > 0) {
        setState.setAvailableWords(getRandomWords(AVAILABLE_WORDS_COUNT));
      } else {
        setState.setAvailableWords([]);
      }
      setState.setSentenceWords([]);
      setState.setCurrentSentence("");
      setState.setAbsurdityScore(0);
      
      const initialJokerConfig = INITIAL_JOKERS || { customWord: 1, customPhrase: 1 };
      for (let i = 1; i <= numPlayers; i++) {
        setState[`setPlayer${i}Score`](0);
        setState[`setPlayer${i}History`]([]);
        setState[`setPlayer${i}Jokers`]({...initialJokerConfig});
        setState[`setPlayer${i}SpecialEffect`](false);
      }
      
      setState.setCurrentPlayer(1);
      setState.setCurrentRound(1);
      setState.setIsGameOver(false); 
      setState.setIsCheatMenuOpen(false);
      showInfoToast("Jeu réinitialisé", "Une nouvelle partie commence !");
    }
  };

  const cheatAddScore = (pointsToAdd, targetPlayer) => {
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Score`](prev => prev + pointsToAdd);
    });
  };

  const cheatSetScore = (scoreToSet, targetPlayer) => {
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Score`](scoreToSet);
    });
  };

  const cheatAddJokers = (count, targetPlayer) => {
    awardSpecificJokers(count, targetPlayer);
  };
  
  const cheatResetJokers = (targetPlayer) => {
    resetPlayerJokers(targetPlayer);
  };

  const cheatEndRound = () => {
    endTurnInternal(0, false, false, true); 
  };

  const cheatChangeRound = (delta) => {
    let newRound = currentRound + delta;
    if (newRound < 1) newRound = 1;
    if (newRound > TOTAL_ROUNDS && TOTAL_ROUNDS > 0) newRound = TOTAL_ROUNDS;
    setState.setCurrentRound(newRound);
    if (newRound > TOTAL_ROUNDS && TOTAL_ROUNDS > 0) {
      setState.setIsGameOver(true);
    } else {
      setState.setIsGameOver(false);
    }
  };

  const cheatTriggerSpecialEvent = (targetPlayer) => {
    addSpecialWordToAvailable(SPECIAL_EVENT_WORD, targetPlayer, false); 
    triggerSpecialEventUI(targetPlayer);
    
    const points = SPECIAL_EVENT_POINTS || 1000;
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Score`](prev => prev + points);
    });
  };

  const cheatWinGame = (targetPlayer) => {
    applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Score`](prev => prev + 10000); 
    });
    setState.setIsGameOver(true);
    showInfoToast("Cheat: Victoire Forcée!", `Le destin a été scellé.`);
  };

  const cheatLoseGame = (targetPlayer) => {
     applyToTargetPlayer(targetPlayer, (playerNum) => {
      setState[`setPlayer${playerNum}Score`](0); 
    });
    if (targetPlayer === "current" || targetPlayer.startsWith("player")) {
        const playerNumToTarget = targetPlayer === "current" ? currentPlayer : parseInt(targetPlayer.replace("player", ""), 10);
        if (numPlayers === 1 && playerNumToTarget === 1) {
            setState.setIsGameOver(true);
        } else if (numPlayers > 1) {
        }
    }
    showInfoToast("Cheat: Défaite Forcée!", `La chance n'était pas de votre côté.`);
  };

  const cheatFillSentence = () => {
    const randomWordCount = Math.floor(Math.random() * 5) + 3; 
    const randomWords = getRandomWords(randomWordCount, true); 
    setState.setSentenceWords(randomWords.map(w => ({ id: `cheat-${w.text}-${Date.now()}`, text: w.text, isCheatWord: true })));
    showInfoToast("Cheat: Phrase Remplie!", `Des mots absurdes ont été invoqués.`);
  };

  const cheatClearSentence = () => {
    setState.setSentenceWords([]);
    showInfoToast("Cheat: Phrase Vidée!", `Les mots se sont évanouis.`);
  };


  return {
    submitSentence,
    openJokerModal,
    handleUseJoker,
    refreshWords: refreshWordsForNewTurn,
    skipTurn,
    resetGame,
    addSpecialWordToAvailable,
    cheatAddScore,
    cheatSetScore,
    cheatAddJokers,
    cheatResetJokers,
    cheatEndRound,
    cheatChangeRound,
    cheatTriggerSpecialEvent,
    cheatWinGame,
    cheatLoseGame,
    cheatFillSentence,
    cheatClearSentence
  };
};
