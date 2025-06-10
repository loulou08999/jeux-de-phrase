jsx
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
// Import LoginForm component here
// Import SignupForm component here

const AuthModal = ({ trigger }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('login'); // 'login' or 'signup'

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{activeTab === 'login' ? 'Se connecter' : 'Créer un compte'}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-center space-x-4 mb-4">
          <button
            className={`px-4 py-2 ${activeTab === 'login' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => handleTabChange('login')}
          >
            Se connecter
          </button>
          <button
            className={`px-4 py-2 ${activeTab === 'signup' ? 'border-b-2 border-primary' : ''}`}
            onClick={() => handleTabChange('signup')}
          >
            Créer un compte
          </button>
        </div>
        {activeTab === 'login' ? (
          // Render LoginForm component here
          <div>Login Form Placeholder</div>
        ) : (
          // Render SignupForm component here
          <div>Signup Form Placeholder</div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default AuthModal;