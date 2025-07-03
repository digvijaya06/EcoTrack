import React, { createContext, useContext, useState, useEffect } from 'react';

const ChallengeContext = createContext();

export const ChallengeProvider = ({ children }) => {
  const [selectedChallenge, setSelectedChallenge] = useState(() => {
    // Initialize from localStorage if available
    const stored = localStorage.getItem('selectedChallenge');
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    if (selectedChallenge) {
      localStorage.setItem('selectedChallenge', JSON.stringify(selectedChallenge));
    } else {
      localStorage.removeItem('selectedChallenge');
    }
  }, [selectedChallenge]);

  return (
    <ChallengeContext.Provider value={{ selectedChallenge, setSelectedChallenge }}>
      {children}
    </ChallengeContext.Provider>
  );
};

export const useChallenge = () => {
  const context = useContext(ChallengeContext);
  if (!context) {
    throw new Error('useChallenge must be used within a ChallengeProvider');
  }
  return context;
};
