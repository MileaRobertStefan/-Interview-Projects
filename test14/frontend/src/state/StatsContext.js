import React, { createContext, useCallback, useContext, useState } from 'react';
const itemService = require('../services/itemsHttpService').default;

const StatContext = createContext();


export function StatProvider({ children }) {
    const defaultValues = {
        total: 0,
        averagePrice: 0,
    };
    const [stats, setStats] = useState(defaultValues);

    const fetchItemStats = useCallback(async (signal) => {
        const stats = await itemService.getItemStats(signal);
        setStats(stats);
        // console.log('Stats in context:', stats);
        return stats;
    }, []);

    return (
        <StatContext.Provider value={{ stats, fetchItemStats }}>
            {children}
        </StatContext.Provider>
    );
}

export const useStats = () => useContext(StatContext);