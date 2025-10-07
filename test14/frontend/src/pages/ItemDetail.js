import './ItemDetail.css';

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const itemService = require('../services/itemsHttpService').default;

function ItemDetail({ item }) {
  const { id } = useParams();
  const [fetchItem, setItem] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (item) return; // If item is passed as prop, no need to fetch

    itemService.getItemById(id)
      .then(setItem)
      .catch((err) => {
        console.error(err);
        navigate('/');
      });
  }, [id, navigate]);

  item = item || fetchItem;

  if (!item) return <p>Loading...</p>;

  return (
    <div className="item-detail">
      <h2 className="item-detail__title">{item.name}</h2>
      <p className="item-detail__text"><strong>Category:</strong> {item.category}</p>
      <p className="item-detail__text"><strong>Price:</strong> ${item.price}</p>
    </div>
  );
}

export default ItemDetail;