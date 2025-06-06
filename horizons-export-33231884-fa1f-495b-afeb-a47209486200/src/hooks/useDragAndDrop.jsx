
import React, { useState } from 'react';

export const useDragAndDrop = (state, setState) => {
  const [isDragging, setIsDragging] = useState(false);
  const [draggedItemInfo, setDraggedItemInfo] = useState(null);

  const { availableWords, sentenceWords } = state;
  const { setAvailableWords, setSentenceWords } = setState;

  const handleActualDragStart = () => setIsDragging(true);
  const handleActualDragEnd = () => {
    setIsDragging(false);
    setDraggedItemInfo(null);
  };

  const onWordDragStart = (event, word) => {
    if (event && event.dataTransfer) {
      event.dataTransfer.setData("wordId", word.id);
      event.dataTransfer.setData("wordText", word.text);
      event.dataTransfer.setData("wordSource", word.source || (availableWords.find(w => w.id === word.id) ? "available" : "sentence"));
    }
    setDraggedItemInfo({ id: word.id, text: word.text, source: word.source || (availableWords.find(w => w.id === word.id) ? "available" : "sentence") });
    handleActualDragStart();
  };

  const handleDropInSentence = (event) => {
    event.preventDefault();
    if (event && event.dataTransfer) {
      const wordId = event.dataTransfer.getData("wordId");
      const wordText = event.dataTransfer.getData("wordText");
      const source = event.dataTransfer.getData("wordSource");

      const currentSentenceWords = Array.isArray(sentenceWords) ? sentenceWords : [];
      const currentAvailableWords = Array.isArray(availableWords) ? availableWords : [];

      if (wordId && !currentSentenceWords.find(w => w.id === wordId)) {
        setSentenceWords(prev => [...(Array.isArray(prev) ? prev : []), { id: wordId, text: wordText, source: 'sentence' }]);
        if (source === "available") {
          setAvailableWords(prev => (Array.isArray(prev) ? prev : []).filter(w => w.id !== wordId));
        }
      }
    }
    handleActualDragEnd();
  };

  const handleDropInAvailable = (event) => {
    event.preventDefault();
    if (event && event.dataTransfer) {
      const wordId = event.dataTransfer.getData("wordId");
      const wordText = event.dataTransfer.getData("wordText");
      const source = event.dataTransfer.getData("wordSource");
      
      const currentSentenceWords = Array.isArray(sentenceWords) ? sentenceWords : [];
      const currentAvailableWords = Array.isArray(availableWords) ? availableWords : [];

      if (wordId && !currentAvailableWords.find(w => w.id === wordId)) {
        setAvailableWords(prev => [...(Array.isArray(prev) ? prev : []), { id: wordId, text: wordText, source: 'available' }]);
        if (source === "sentence") {
          setSentenceWords(prev => (Array.isArray(prev) ? prev : []).filter(w => w.id !== wordId));
        }
      }
    }
    handleActualDragEnd();
  };

  return {
    isDragging,
    draggedItemInfo,
    onWordDragStart,
    handleActualDragEnd,
    handleDropInSentence,
    handleDropInAvailable,
  };
};
