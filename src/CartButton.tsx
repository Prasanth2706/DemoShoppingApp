import React from 'react';
import { observer } from 'mobx-react-lite';
import productStore from './ApiStore';
import './CartButton.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';

const CartButton: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  const handleCartClick = (): void => {
    if (location.pathname === '/cart') {
      setShowPopup(true);
    } else {
      navigate('/cart');
    }
  };

  return (
    <div>
      <div
        className='button'
        onClick={handleCartClick}
      >
        <span style={{ fontSize: 'larger' }}> My Cart</span>
        <span className='badge'>{productStore.count}</span>
      </div>
      {showPopup && (
        <div className='popup'>
          <p>You are already in Cart!</p>
          <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
      )}
    </div>
  );
};

export default observer(CartButton);
