// ShoppingCartIcon.js

import React from 'react';
import { useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const ShoppingCartIcon = () => {
  const history = useHistory();

  const handleCartClick = () => {
    // Navigate to the cart page
    history.push("/cart");
  };

  return (
    <div onClick={handleCartClick} style={{ cursor: 'pointer' }}>
      <FontAwesomeIcon icon={faShoppingCart} />
    </div>
  );
};

export default ShoppingCartIcon;
