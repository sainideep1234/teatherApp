import { createContext, useState, useContext } from 'react';
import { Relationship } from '../screens/Dashboard';

// Define the context value type
interface RelationshipContextType {
  relationship: Relationship | null;
  setRelationship: React.Dispatch<React.SetStateAction<Relationship | null>>;
}

const RelationshipContext = createContext<RelationshipContextType | undefined>(
  undefined,
);

export const RelationshipProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [relationship, setRelationship] = useState<Relationship | null>(null);

  return (
    <RelationshipContext.Provider value={{ relationship, setRelationship }}>
      {children}
    </RelationshipContext.Provider>
  );
};

export const useRelationship = () => {
  const context = useContext(RelationshipContext);
  if (!context) {
    throw new Error(
      'useRelationship must be used within a RelationshipProvider',
    );
  }
  return context;
};
