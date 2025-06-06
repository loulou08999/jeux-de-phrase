
import React from 'react';
import { motion } from 'framer-motion';

const BackgroundAnimations = () => {
  const gifUrl = "https://storage.googleapis.com/hostinger-horizons-assets-prod/33231884-fa1f-495b-afeb-a47209486200/00d35de0ef1e3d3cfb6fae2b2ee693c2.gif";

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-2]">
      <motion.div
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: `url(${gifUrl})`,
          backgroundSize: 'cover', 
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat', 
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.2 }} 
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </div>
  );
};

export default BackgroundAnimations;
