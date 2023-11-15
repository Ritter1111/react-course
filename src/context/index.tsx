import React, { ReactNode, createContext, useContext, useState } from 'react';
import { CardData } from '../types/types';

export type AppContextType = {
  // searchValue: string;
  items: CardData[];
  delailsData: CardData | undefined;
  // setSearchValue: (value: string) => void;
  setItems: (items: CardData[]) => void;
  setDetailsData: (delailsData: CardData) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppContextProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // const [searchValue, setSearchValue] = useState('');
  const [items, setItems] = useState<CardData[]>([]);
  const [delailsData, setDetailsData] = useState<CardData>();

  return (
    <AppContext.Provider
      value={{
        // searchValue,
        items,
        // setSearchValue,
        setItems,
        delailsData,
        setDetailsData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('wrap component in AppContextProvider');
  }
  return context;
};
