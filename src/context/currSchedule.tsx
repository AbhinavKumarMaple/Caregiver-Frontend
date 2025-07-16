import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

interface CurrScheduleContextType {
  currScheduleId: string;
  setCurrScheduleId: (id: string) => void;
}

const CurrScheduleContext = createContext<CurrScheduleContextType>({
  currScheduleId: "",
  setCurrScheduleId: () => {},
});

interface CurrScheduleProviderProps {
  children: ReactNode;
}

export const CurrScheduleProvider = ({
  children,
}: CurrScheduleProviderProps) => {
  const [currScheduleId, setCurrScheduleId] = useState<string>("");

  const value = { currScheduleId, setCurrScheduleId };

  return (
    <CurrScheduleContext.Provider value={value}>
      {children}
    </CurrScheduleContext.Provider>
  );
};

export const useCurrSchedule = () => useContext(CurrScheduleContext);
