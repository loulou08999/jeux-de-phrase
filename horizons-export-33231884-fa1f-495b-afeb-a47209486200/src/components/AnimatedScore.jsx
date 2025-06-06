
import React, { useEffect, useState } from 'react';
import { motion, useSpring, useTransform } from 'framer-motion';

const AnimatedScore = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const springValue = useSpring(value, { stiffness: 300, damping: 30 });

  useEffect(() => {
    springValue.set(value);
  }, [value, springValue]);

  useEffect(() => {
    const unsubscribe = springValue.onChange(latest => {
      setDisplayValue(Math.round(latest));
    });
    return unsubscribe;
  }, [springValue]);

  const color = useTransform(
    springValue,
    [0, 50, 100, 120],
    ["#FF5555", "#FFA500", "#90EE90", "#00FFFF"] 
  );

  return (
    <motion.span style={{ color }}>
      {displayValue}
    </motion.span>
  );
};

export default AnimatedScore;
