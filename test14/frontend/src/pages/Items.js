import './Items.css';

import React, { useEffect } from 'react';
import { useData } from '../state/DataContext';
import { Link } from 'react-router-dom';
import { List } from 'react-window';
import { StatProvider } from '../state/StatsContext';
import Stats from './ItemsStats';
import ItemDetail from './ItemDetail';


const take = 100;

function Items() {
  const [skip, setSkip] = React.useState(0);
  const handleNext = () => {
    setSkip(skip + take);
  };

  const handlePrevious = () => {
    setSkip(Math.max(0, skip - take));
  };

  const { items, fetchItems } = useData();

  const [searchTerm, setSearchTerm] = React.useState('');

  useEffect(() => {
    const controller = new AbortController();

    fetchItems({ skip, take, signal: controller.signal }).then(data => {
      console.log('Fetched items:', data.length);
      setExpandedItemId(null);
    }).catch(error => {
      if (error.name === 'AbortError') {
        return;
      }

      console.error(error);
    });

    return () => {
      controller.abort("Clean up");
    };
  }, [skip]);

  const [expandedItemId, setExpandedItemId] = React.useState(null);
  const toggleExpand = (itemId) => {
    setExpandedItemId(expandedItemId === itemId ? null : itemId);
  };

  if (!Array.isArray(items)) return <p>Loading...</p>;

  console.log('Rendering items:', items);


  const Row = ({ index, data, style }) => {
    const { items, expandedItemId, toggleExpand } = data;

    if (index >= items.length) {
      return <div style={style}>Loading...</div>;
    }

    const item = items[index];

    return (
      <div style={style} onClick={() => toggleExpand(item.id)}>
        <div className="item-details" id={item.id}>
          <div className="flex items-center justify-between">
            {item.name}
          </div>

          {expandedItemId === item.id && (
            <div className="item-details">
              <ItemDetail item={item} />
              <Link to={'/items/' + item.id} className="view-full-button">
                View Full Page
              </Link>
            </div>
          )}
        </div>
      </div>
    );
  };

  function rowHeight(index, { data }) {
    const { items, expandedItemId } = data;

    switch (items[index].id == expandedItemId) {
      case true: {
        return 300;
      }
      case false: {
        return  65;
      }
    }
  }

    return (
      <>
        <StatProvider>
          <Stats />
        </StatProvider>

        <div className="items-container">
          <div className="items-search">
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setSkip(0);
                fetchItems({ skip: 0, take, q: e.target.value });
              }}
            />
          </div>

          <div className="items-pagination">
            <button onClick={handlePrevious} disabled={skip === 0}>Previous</button>
            <span className="items-page">Page {Math.floor(skip / take) + 1}</span>
            <button onClick={handleNext} disabled={items.length < take}>Next</button>
          </div>

          <List className="scrollable-container"
            rowCount={items.length}
            rowHeight={rowHeight}
            rowProps={{ data: { expandedItemId, toggleExpand, items } }}
            rowComponent={Row}
            initialNumToRender={10}
          />
        </div>
      </>
    );
  }

  export default Items;
