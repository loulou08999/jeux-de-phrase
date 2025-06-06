
import React from "react";
import { motion } from "framer-motion";

const DraggableWord = ({ word, id, onDragStart, onDragEnd, layoutIdPrefix = "word" }) => {
  return (
    <motion.div
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.7}
      onDragStart={onDragStart}
      onDragEnd={(event, info) => onDragEnd(event, info, id)}
      className="word-card px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white font-medium rounded-lg cursor-grab active:cursor-grabbing shadow-lg hover:shadow-xl transition-all"
      whileHover={{ scale: 1.1, y: -5 }}
      whileTap={{ scale: 0.95, boxShadow: "0px 2px 5px rgba(0,0,0,0.2)"}}
      layoutId={`${layoutIdPrefix}-${id}`}
    >
      {word}
    </motion.div>
  );
};

export default DraggableWord;
