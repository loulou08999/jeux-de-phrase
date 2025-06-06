
import React, { useState, useEffect } from 'react';

export const usePersistentState = (key, defaultValue, initializer) => {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);
    if (storedValue !== null) {
      try {
        return JSON.parse(storedValue);
      } catch (error) {
        localStorage.removeItem(key); 
        return typeof initializer === 'function' ? initializer() : defaultValue;
      }
    }
    return typeof initializer === 'function' ? initializer() : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
};
