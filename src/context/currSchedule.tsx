import React,{ createContext, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Create a context for the current schedule ID
interface CurrScheduleContextType {
  currScheduleId: string;
  setCurrScheduleId: (id: string) => void;
}

// Create the context with default values
const CurrScheduleContext = createContext<CurrScheduleContextType>({
  currScheduleId: '',
  setCurrScheduleId: () => {},
});

// Create a provider component
interface CurrScheduleProviderProps {
  children: ReactNode;
}

export const CurrScheduleProvider = ({ children }: CurrScheduleProviderProps) => {
  const [currScheduleId, setCurrScheduleId] = useState<string>('');

  const value = { currScheduleId, setCurrScheduleId };
  
  return (
    <CurrScheduleContext.Provider value={value}>
      {children}
    </CurrScheduleContext.Provider>
  );
};

// Create a custom hook for using this context
export const useCurrSchedule = () => useContext(CurrScheduleContext);