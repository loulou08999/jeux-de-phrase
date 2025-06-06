
import React from 'react';

export const initialWordPool = [
  "le chat", "un biscuit", "la lune", "une banane", "le robot", "un nuage", "la chaussette", "un dragon", "le pirate", "une licorne", "le soleil", "un arbre", "la voiture", "un livre", "la musique", "le fromage", "une étoile", "le jardin", "un oiseau", "la montagne", "un magicien", "la rivière", "le désert", "une fleur", "le château", "un fantôme", "la forêt", "une potion", "le trésor", "un monstre", "Keeleios", "forsaken", "dead rail", "system", "l'ordinateur", "la pizza", "le téléphone", "une fusée", "le café", "une guitare", ".", "loulou", "roblox", "un pixel", "un algorithme", "le code", "la matrice", "le cyborg", "un alien", "le cosmos", "une galaxie", "le trou noir", "un atome", "la molécule", "le scientifique", "l'expérience", "la découverte", "l'invention", "le futur", "le passé", "le présent", "un paradoxe", "le voyageur", "la machine", "le secret", "l'énigme", "le mystère", "la clé", "la porte", "le chemin", "la quête", "l'aventure", "le héros", "le méchant", "la bataille", "la victoire", "la défaite", "la légende", "le mythe", "le conte", "l'histoire", "le rêve", "le cauchemar", "l'illusion", "la réalité", "la vérité", "le mensonge", "la synergie", "le flux", "la dynamique", "le paradigme", "la stratégie", "la tactique", "l'objectif", "la mission", "la vision", "le concept", "l'innovation", "la disruption", "l'évolution", "la révolution",
  "chante", "danse", "vole", "mange", "dort", "parle", "joue", "rêve", "regarde", "construit", "écrit", "dessine", "écoute", "voyage", "pense", "cuisine", "explore", "découvre", "imagine", "observe", "combat", "cherche", "transforme", "illumine", "murmure", "grandit", "rétrécit", "flotte", "glisse", "escalade", "programme", "surfe", "téléporte", "analyse", "optimise", "compose", "calcule", "invente", "prédit", "manipule", "contrôle", "libère", "sauve", "détruit", "crée", "modifie", "questionne", "répond", "explique", "comprend", "ignore", "oublie", "se souvient", "apprend", "enseigne", "guide", "suit", "trahit", "protège", "attaque", "défend", "observe", "espionne", "synergise", "fluxe", "dynamise", "conceptualise", "innove", "disrupte", "évolue", "révolutionne",
  "joyeusement", "tristement", "rapidement", "lentement", "secrètement", "bruyamment", "silencieusement", "avec style", "sous la pluie", "sur Mars", "demain", "hier", "toujours", "parfois", "jamais", "curieusement", "prudemment", "follement", "sérieusement", "magiquement", "délicatement", "férocement", "élégamment", "mystérieusement", "soudainement", "éternellement", "drôlement", "bizarrement", "clairement", "sombrement", "numériquement", "virtuellement", "logiquement", "mécaniquement", "électroniquement", "quantiquement", "cosmiquement", "galactiquement", "temporellement", "spatialement", "dimensionnellement", "secrètement", "ouvertement", "librement", "dangereusement", "prudemment", "efficacement", "aléatoirement", "précisément", "vaguement", "intensément", "légèrement", "profondément", "superficiellement", "stratégiquement", "tactiquement", "conceptuellement", "innovativement"
];

const SPECIAL_EVENT_WORD = "co00gui";
const SPECIAL_EVENT_CHANCE = 0.001; 

export const getRandomWords = (count) => {
  let currentPool = [...initialWordPool];
  if (Math.random() < SPECIAL_EVENT_CHANCE && !currentPool.includes(SPECIAL_EVENT_WORD)) {
    const randomIndex = Math.floor(Math.random() * (currentPool.length + 1));
    currentPool.splice(randomIndex, 0, SPECIAL_EVENT_WORD);
  }
  
  const shuffled = currentPool.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).map((word, index) => ({ id: `word-${index}-${Date.now()}`, text: word }));
};


const commonSubjects = ["je", "tu", "il", "elle", "on", "nous", "vous", "ils", "elles", "le chat", "un robot", "la licorne", "le magicien", "le dragon", "le pirate", "keeleios", "system", "l'ordinateur", "le programmeur", "loulou", "roblox", "le scientifique", "le voyageur", "le héros", "la synergie", "le concept"];
const commonVerbs = ["mange", "danse", "chante", "vole", "parle", "joue", "regarde", "pense", "cuisine", "dort", "combat", "cherche", "transforme", "voyage", "explore", "programme", "analyse", "optimise", "surfe", "téléporte", "code", "calcule", "invente", "prédit", "manipule", "contrôle", "libère", "sauve", "détruit", "crée", "modifie", "questionne", "répond", "explique", "comprend", "apprend", "enseigne", "synergise", "conceptualise", "innove", "évolue"];
const commonArticles = ["le", "la", "les", "un", "une", "des", "mon", "ton", "son", "notre", "votre", "leur", "ce", "cet", "cette", "ces", "du", "au", "aux"];
const commonAdjectives = ["grand", "petit", "rouge", "bleu", "vert", "joyeux", "triste", "rapide", "lent", "drôle", "bizarre", "magique", "numérique", "virtuel", "logique", "mécanique", "forsaken", "brisé", "cosmique", "galactique", "quantique", "temporel", "spatial", "secret", "mystérieux", "puissant", "faible", "ancien", "futuriste", "stratégique", "tactique", "innovant", "disruptif"];
const commonAdverbs = ["joyeusement", "tristement", "rapidement", "lentement", "secrètement", "bruyamment", "silencieusement", "prudemment", "follement", "sérieusement", "numériquement", "virtuellement", "logiquement", "mécaniquement", "quantiquement", "cosmiquement", "temporellement", "spatialement", "efficacement", "aléatoirement", "précisément", "stratégiquement", "innovativement"];
const techWords = ["keeleios", "forsaken", "dead rail", "system", "ordinateur", "robot", "programme", "numérique", "virtuel", "code", "pixel", "octet", "algorithme", "matrice", "cyborg", "IA", "interface", "base de données", "réseau", "synergie", "flux", "paradigme"];
const businessWords = ["synergie", "flux", "dynamique", "paradigme", "stratégie", "tactique", "objectif", "mission", "vision", "concept", "innovation", "disruption", "évolution", "révolution"];


export const calculateAbsurdityScore = (sentenceWords, isCustomPhrase = false, toastFn, awardMegaBonusFn, triggerSpecialEventUIFn) => {
  if (!sentenceWords || sentenceWords.length === 0) return { score: 0, penalties: [], bonuses: [], megaBonusAwarded: false, specialEventTriggered: false };

  let score = 40; 
  let penalties = [];
  let bonuses = [];
  let megaBonusAwarded = false;
  let specialEventTriggered = false;
  const sentenceTextArray = sentenceWords.map(w => w.text ? w.text.toLowerCase() : String(w).toLowerCase());
  const sentenceString = sentenceTextArray.join(" ");
  const wordCount = sentenceWords.length;

  if (sentenceTextArray.includes(".")) {
    score += 120;
    bonuses.push(`Mot secret "." trouvé ! MEGA BONUS ! +120 pts`);
    if (awardMegaBonusFn) {
        awardMegaBonusFn();
        megaBonusAwarded = true;
    }
  }

  if (sentenceTextArray.includes(SPECIAL_EVENT_WORD)) {
    score += 1000;
    bonuses.push(`🌟 MOT ÉVÉNEMENT "${SPECIAL_EVENT_WORD}" ! SUPER BONUS ! +1000 pts 🌟`);
    specialEventTriggered = true;
    if (triggerSpecialEventUIFn) {
      triggerSpecialEventUIFn();
    }
    toastFn({
        title: `🎉🎉 ÉVÉNEMENT SPÉCIAL ! 🎉🎉`,
        description: `Le mot "${SPECIAL_EVENT_WORD}" vous fait gagner 1000 points ! Regardez votre case !`,
        className: "bg-gradient-to-r from-red-500 via-orange-500 to-yellow-400 text-white font-extrabold border-amber-300 border-2",
        duration: 8000,
    });
  }


  if (isCustomPhrase) {
    score += 25; 
    bonuses.push(`Phrase personnalisée (Joker) : +25 pts`);
  }

  let hasSubject = false;
  let hasVerb = false;
  let hasArticle = false;
  let hasAdjective = false;
  let hasAdverb = false;
  let techWordCount = 0;
  let businessWordCount = 0;

  sentenceWords.forEach(wordObj => {
    const word = wordObj.text ? wordObj.text.toLowerCase() : String(wordObj).toLowerCase();
    if (commonSubjects.some(s => word.includes(s))) hasSubject = true;
    if (commonVerbs.includes(word)) hasVerb = true;
    if (commonArticles.some(s => word.startsWith(s + " ") || word === s)) hasArticle = true;
    if (commonAdjectives.includes(word)) hasAdjective = true;
    if (commonAdverbs.includes(word)) hasAdverb = true;
    if (techWords.some(tw => word.includes(tw))) techWordCount++;
    if (businessWords.some(bw => word.includes(bw))) businessWordCount++;
  });

  if (!isCustomPhrase) {
    if (!hasSubject && wordCount > 1 && !sentenceTextArray.includes(".") && !sentenceTextArray.includes(SPECIAL_EVENT_WORD)) {
      score = Math.max(0, score - 10);
      penalties.push(`Manque un sujet clair ? : -10 pts`);
    } else if (hasSubject) {
      score += 12;
      bonuses.push(`Sujet bien identifié : +12 pts`);
    }

    if (!hasVerb && wordCount > 1 && !sentenceTextArray.includes(".") && !sentenceTextArray.includes(SPECIAL_EVENT_WORD)) {
      score = Math.max(0, score - 10);
      penalties.push(`Manque un verbe d'action ? : -10 pts`);
    } else if (hasVerb) {
      score += 12;
      bonuses.push(`Verbe dynamique présent : +12 pts`);
    }

    if (!hasArticle && wordCount > 2 && (hasSubject || hasVerb) && !sentenceTextArray.includes(".") && !sentenceTextArray.includes(SPECIAL_EVENT_WORD)) {
      score = Math.max(0, score - 6);
      penalties.push(`Manque d'articles pour lier ? : -6 pts`);
    } else if (hasArticle) {
      score += 8;
      bonuses.push(`Articles bien utilisés : +8 pts`);
    }
  }

  if (hasAdjective) {
    score += 10;
    bonuses.push(`Adjectif descriptif : +10 pts`);
  }
  if (hasAdverb) {
    score += 10;
    bonuses.push(`Adverbe de manière : +10 pts`);
  }
  
  if (wordCount < 3 && !isCustomPhrase && !sentenceTextArray.includes(".") && !sentenceTextArray.includes(SPECIAL_EVENT_WORD)) {
    score = Math.max(0, score - 20);
    penalties.push("Phrase un peu trop courte : -20 pts");
  } else if (wordCount >= 3 && wordCount <= 4) {
    score += 15;
    bonuses.push(`Bonne longueur (concise) : +15 pts`);
  } else if (wordCount >= 5 && wordCount <= 7) {
    const lengthBonus = isCustomPhrase ? 30 : 22;
    score += lengthBonus;
    bonuses.push(`Phrase bien étoffée ! +${lengthBonus} pts`);
  } else if (wordCount > 7) {
    const lengthBonus = isCustomPhrase ? 40 : 30;
    score += lengthBonus;
    bonuses.push(`Quelle éloquence ! Phrase longue ! +${lengthBonus} pts`);
  }
  
  const uniqueWordCount = new Set(sentenceTextArray.filter(w => w !== "." && w !== SPECIAL_EVENT_WORD)).size;
  const uniqueWordBonus = uniqueWordCount * (isCustomPhrase ? 5 : 6);
  score += uniqueWordBonus;
  if (uniqueWordBonus > 0) bonuses.push(`Variété de mots (${uniqueWordCount}) : +${uniqueWordBonus} pts`);

  if (techWordCount > 0) {
    const techBonus = techWordCount * 8;
    score += techBonus;
    bonuses.push(`Thème technologique (${techWordCount} mots) : +${techBonus} pts`);
  }

  if (businessWordCount > 0) {
    const businessBonus = businessWordCount * 9;
    score += businessBonus;
    bonuses.push(`Jargon d'entreprise (${businessWordCount} mots) : +${businessBonus} pts`);
  }

  if (sentenceTextArray.includes("keeleios") && sentenceTextArray.includes("forsaken") && sentenceTextArray.includes("dead rail") && sentenceTextArray.includes("system")) {
      score += 40;
      bonuses.push(`Combo spécial "Keeleios Forsaken Dead Rail System" : +40 pts OMG!`);
  } else if (sentenceTextArray.some(w => ["keeleios", "forsaken", "dead rail", "system"].includes(w))) {
    if (sentenceTextArray.filter(w => ["keeleios", "forsaken", "dead rail", "system"].includes(w)).length >= 2) {
        score += 15;
        bonuses.push(`Combo de mots-clés (2+) : +15 pts`);
    }
  }

  if (score > 100 && Math.random() < 0.30 && !megaBonusAwarded && !specialEventTriggered) { 
    bonuses.push("Joker Gagné!"); 
  }

  penalties.forEach(penaltyMsg => {
    if (toastFn) toastFn({ title: "Oups...", description: penaltyMsg, variant: "destructive", duration: 3000 });
  });
   bonuses.forEach(bonusMsg => {
    if (toastFn && !bonusMsg.includes("Joker Gagné!") && !bonusMsg.includes("MEGA BONUS") && !bonusMsg.includes("SUPER BONUS")) { 
        toastFn({ title: "Excellent !", description: bonusMsg, className:"bg-gradient-to-r from-green-500 to-emerald-600 text-white", duration: 3000 });
    } else if (toastFn && (bonusMsg.includes("MEGA BONUS") || bonusMsg.includes("SUPER BONUS")) ) {
        toastFn({ title: "🌟 BONUS SPÉCIAL 🌟", description: bonusMsg, className: "bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-white font-bold", duration: 5000 });
    }
  });

  return { score: Math.min(1500, Math.max(0, score)), penalties, bonuses, megaBonusAwarded, specialEventTriggered };
};
