
import React from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";

const AbsurdityMeter = ({ score }) => {
  const getLabel = (value) => {
    if (value < 20) return "Pas très absurde";
    if (value < 40) return "Un peu étrange";
    if (value < 60) return "Assez décalé";
    if (value < 80) return "Totalement fou !";
    return "Absurdité maximale !";
  };

  const getGradientColor = (value) => {
    const hue = (value / 100) * 120; 
    return `hsl(${120 - hue}, 70%, 60%)`;
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto p-6 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-lg font-medium text-white mb-2 text-center">Niveau d'absurdité :</h3>
      <p className="text-2xl font-bold text-center mb-4" style={{ color: getGradientColor(score) }}>
        {getLabel(score)}
      </p>
      <div className="relative h-4 w-full rounded-full bg-white/20 overflow-hidden">
        <motion.div
          className="absolute h-full rounded-full"
          style={{ background: `linear-gradient(to right, #66FF99, ${getGradientColor(score)})`}}
          initial={{ width: "0%" }}
          animate={{ width: `${score}%` }}
          transition={{ duration: 0.8, ease: "circOut" }}
        />
      </div>
       <Slider
        defaultValue={[score]}
        value={[score]}
        max={100}
        step={1}
        className="mt-4 opacity-0 pointer-events-none h-0" 
        disabled 
      />
      <p className="text-center text-white/70 mt-2 text-sm">{score} / 100</p>
    </motion.div>
  );
};

export default AbsurdityMeter;
