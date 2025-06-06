
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Gift } from 'lucide-react';

const CheatCodeInput = ({ onApplyCheatCode }) => {
  const [code, setCode] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onApplyCheatCode(code.trim());
      setCode('');
      setIsOpen(false); 
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <motion.div
        initial={false}
        animate={isOpen ? "open" : "closed"}
      >
        {isOpen && (
          <motion.form 
            onSubmit={handleSubmit} 
            className="flex items-center gap-2 p-3 bg-slate-800/80 backdrop-blur-sm rounded-lg shadow-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <Input
              type="text"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              placeholder="Code secret..."
              className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-9 text-sm focus:ring-purple-500"
            />
            <Button type="submit" size="sm" className="bg-purple-600 hover:bg-purple-700 h-9 text-sm">
              Valider
            </Button>
          </motion.form>
        )}
        
        <motion.div
          className="mt-2 flex justify-end"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Button
            onClick={() => setIsOpen(!isOpen)}
            variant="outline"
            size="icon"
            className="rounded-full bg-purple-600/80 hover:bg-purple-500 text-white border-purple-400/50 w-12 h-12 shadow-xl"
          >
            <Gift className="h-6 w-6" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CheatCodeInput;
