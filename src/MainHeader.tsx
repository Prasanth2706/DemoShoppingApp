// import { useNavigate } from 'react-router-dom';
// import CartButton from './CartButton';
// import './MainHeader.css';

// const MainHeader = () => {
//   const navigate = useNavigate();
//   return (
//     <div className='header'>
//       <h1 className='shop' onClick={()=>{navigate('/')}} >Shop</h1>
//       <CartButton />
//     </div>
//   );
// };

// export default MainHeader;

import { useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
import './MainHeader.css';
import React from 'react';

const MainHeader: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className='header'>
      <h1
        className='shop'
        onClick={() => navigate('/')}
      >
        Shop
      </h1>
      <CartButton />
    </div>
  );
};

export default MainHeader;
