import { useNavigate } from 'react-router-dom';
import './MainHeader.css';
import React from 'react';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="header">
      <h1 className="shop" onClick={() => navigate('/')}>
        Demo Shop
      </h1>
      <div className="header-buttons">
        <button
          className="form-button"
          onClick={() => navigate('/form')}
        >
          Login
        </button>
        <button
          className="cart-button"
          onClick={() => navigate('/cart')}
        >
          My Cart
        </button>
      </div>
    </div>
  );
};

export default MainHeader;
