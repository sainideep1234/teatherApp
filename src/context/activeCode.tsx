import { createContext, useState, useContext } from 'react';
import { TetherCode } from '../screens/Dashboard';

// Define the context value type
interface ActiveCodeContextType {
  activeCode: TetherCode | null;
  setActiveCode: React.Dispatch<React.SetStateAction<TetherCode | null>>;
}

const ActiveCodeContext = createContext<ActiveCodeContextType | undefined>(
  undefined,
);

export const ActiveCodeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [activeCode, setActiveCode] = useState<TetherCode | null>(null);

  return (
    <ActiveCodeContext.Provider value={{ activeCode, setActiveCode }}>
      {children}
    </ActiveCodeContext.Provider>
  );
};

export const useActiveCode = () => {
  const context = useContext(ActiveCodeContext);
  if (!context) {
    throw new Error('useActiveCode must be used within an ActiveCodeProvider');
  }
  return context;
};
