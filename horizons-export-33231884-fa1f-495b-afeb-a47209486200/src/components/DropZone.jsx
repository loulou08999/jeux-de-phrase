
import React from "react";
import { motion } from "framer-motion";
import { MoveUp } from "lucide-react";

const DropZone = ({ onDrop, children, isOver }) => {
  return (
    <motion.div
      className={`relative min-h-[80px] p-4 border-2 border-dashed rounded-xl flex flex-wrap items-center justify-center gap-2 transition-colors duration-300
        ${isOver ? "border-green-500 bg-green-900/30" : "border-white/30 bg-white/10"}`}
      onDragOver={(e) => e.preventDefault()}
      onDrop={onDrop}
    >
      {children.length === 0 && (
        <motion.div 
          className="text-white/50 flex flex-col items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <MoveUp className="w-8 h-8 mb-1" />
          <span>Déposez les mots ici</span>
        </motion.div>
      )}
      {children}
    </motion.div>
  );
};

export default DropZone;
