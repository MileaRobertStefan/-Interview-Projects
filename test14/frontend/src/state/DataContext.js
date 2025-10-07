import React, { createContext, useCallback, useContext, useState } from 'react';

const DataContext = createContext();

const itemService = require('../services/itemsHttpService').default;

export function DataProvider({ children }) {
  const [items, setItems] = useState(null);

  const fetchItems = useCallback(async ({ skip, take, q = null, signal }) => {
    const items = await itemService.getItems({ skip, take, q }, signal);
    setItems(items);
    return items;
  }, []);


  const defaultValues = {
    total: 0,
    averagePrice: 0,
  };
  const [stats, setStats] = useState(defaultValues);


  const fetchItemStats = useCallback(async (signal) => {
    const stats = await itemService.getItemStats(signal);
    setStats(stats);
    console.log('Stats in context:', stats);
    return stats;
  }, []);

  return (
    <DataContext.Provider value={{ items, fetchItems, stats, fetchItemStats }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => useContext(DataContext);