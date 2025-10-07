import './ItemsStats.css';

import { useStats } from '../state/StatsContext';
import React, { useEffect } from 'react';



function Stats() {
  const { stats, fetchItemStats } = useStats();

  useEffect(() => {
    const controller = new AbortController();
    fetchItemStats();

    const intervalId = setInterval(() => {
      fetchItemStats();
    }, 10_000);

    return () => {
      clearInterval(intervalId)
      controller.abort("Clean up");
    };
  }, [fetchItemStats]);

  if (!stats) return <p>Loading...</p>;

  return (
    <div className="item-stats">
      <h2 className="item-stats__title">Item Statistics</h2>
      <p className="item-stats__text">Total Items: {stats.count}</p>
      <p className="item-stats__text">Total Price: {stats.total.toFixed(2)}</p>
      <p className="item-stats__text">Average Price: {stats.averagePrice.toFixed(2)}</p>
    </div>
  );
}

export default Stats;
