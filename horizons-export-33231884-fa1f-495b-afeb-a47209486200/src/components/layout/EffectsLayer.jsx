
import React from 'react';
import { motion } from 'framer-motion';

const EffectsLayer = () => {
  const particles = Array.from({ length: 20 }); 

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-500/30"
          initial={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            scale: Math.random() * 0.5 + 0.1,
            opacity: Math.random() * 0.3 + 0.1,
          }}
          animate={{
            x: `${Math.random() * 100}vw`,
            y: `${Math.random() * 100}vh`,
            rotate: Math.random() * 360,
          }}
          transition={{
            duration: Math.random() * 20 + 20, 
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'linear',
          }}
          style={{
            width: `${Math.random() * 50 + 20}px`,
            height: `${Math.random() * 50 + 20}px`,
          }}
        />
      ))}
       <motion.div
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(circle at center, rgba(128,0,128,0.05) 0%, rgba(128,0,128,0) 60%)',
        }}
        animate={{ opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
};

export default EffectsLayer;
