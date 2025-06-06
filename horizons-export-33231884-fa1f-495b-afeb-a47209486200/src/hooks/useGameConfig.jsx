
import React from 'react';

const useGameConfig = (configOverrides = {}) => {
  const defaultConfig = {
    TOTAL_ROUNDS: 10,
    AVAILABLE_WORDS_COUNT: 25, 
    INITIAL_JOKERS: {
      customWord: 1,
      customPhrase: 1,
    },
    MAX_HISTORY_PER_PLAYER: 5,
    JOKER_WIN_THRESHOLD: 100, 
    JOKER_WIN_CHANCE: 0.3, 
    SPECIAL_EVENT_CHANCE: 0.001, 
    SPECIAL_EVENT_WORD: "co00gui",
    SPECIAL_EVENT_POINTS: 1000,
    CHEAT_CODE_POINTS: {
      "keelous": 230,
      "keeleios": 100,
      "loulou": 110,
      "system": 160,
      "roblox": 5100,
      "co00gui": 1000, 
    },
    BASE_SCORE: 40,
    GRAMMAR_BONUS: {
      subject: 10,
      verb: 10,
      article: 5,
    },
    LENGTH_BONUS_PER_WORD: 3,
    LENGTH_THRESHOLD_BONUS: {
      5: 15,
      8: 25,
    },
    VARIETY_BONUS_PER_UNIQUE_WORD: 2,
    TECH_WORD_BONUS: 20,
    CORPORATE_JARGON_BONUS: 30,
    SECRET_DOT_BONUS: 120,
    COMBO_BONUS: {
      "Keeleios Forsaken Dead Rail System": 40
    }
  };

  return { ...defaultConfig, ...configOverrides };
};

export { useGameConfig };
