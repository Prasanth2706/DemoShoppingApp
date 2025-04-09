import React, { useEffect, useState } from 'react';
import './Cart.css';
import { observer } from 'mobx-react-lite';
import productStore from './ApiStore';
import Modal from './Modal';
import { db } from './firebase';
import useShoppingCart from './CartGroupItem';

function Cart() {
  const { groupedCartItems, updateGroupedCartItems, removeFromCart } =
    useShoppingCart(productStore.cartstore);

  const totalItemCount = groupedCartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.count,
    0
  );
  const totalPrice = groupedCartItems.reduce(
    (accumulator, currentItem) =>
      accumulator + currentItem.count * currentItem.item.rate,
    0
  );

  productStore.count = totalItemCount;

  const [groupedDropdowns, setGroupedDropdowns] = useState<{
    [itemName: string]: boolean;
  }>({});

  const toggleDropdown = (itemName: string) => {
    setGroupedDropdowns((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName] || false,
    }));
  };

  const [isModalOpen, setModalOpen] = useState(false);
  useEffect(() => {
    console.log('Modal state updated:', isModalOpen);
  }, [isModalOpen]);
  
  const buyItem = () => {
    if (groupedCartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    groupedCartItems.forEach((item) => {
      db.collection('posts').add({
        name: item.item.name,
        description: item.item.description || 'This is a product',
        price: item.item.rate,
        image: item.item.image,
        itemCount: item.count,
      });
    });

    // Clear the cart after placing the order
    setModalOpen(true);
    productStore.cartstore = [];
    updateGroupedCartItems([]);
    productStore.count = 0;

    // Show the modal

    console.log('Modal state set to true'); // Debug log

  };

  const clearCart = () => {
    productStore.cartstore = [];
    updateGroupedCartItems([]);
  };

  return (
    <div className='cart'>
      <div className='cart-top'>
        <div className='cart-maintitle'>
          <p>Your Shopping Cart</p>
        </div>
      </div>
      {groupedCartItems?.length === 0 ? (
        <p className='cart-message'>Your cart is empty.</p>
      ) : (
        <>
          {groupedCartItems?.map((groupedItem) => (
            <div className='cart-data' key={groupedItem.item.name}>
              <div className='cart-first-data'>
                <div className='cart-image'>
                  <img
                    width='56px'
                    height='56px'
                    src={groupedItem.item?.image}
                    alt={groupedItem.item?.name}
                  />
                </div>
                <div className='cart-info'>
                  <div className='cart-title'>
                    <p>{groupedItem.item?.name}</p>
                  </div>
                  <div className='cart-descrip'>
                    <p>
                      <span className='cart-description'>Description:</span>
                      <span className='description-text'>
                        {groupedItem.item?.description}
                      </span>
                    </p>
                  </div>
                  <div className='cart-price'>₹ {groupedItem.item?.rate}</div>
                  <div className='quan'>
                    <div className='quantity-container'>
                      <div
                        className='quantity'
                        onClick={() => toggleDropdown(groupedItem.item?.name)}
                      >
                        Qty: {groupedItem.count}
                      </div>
                      {groupedDropdowns[groupedItem.item?.name] && (
                        <div className='dropdown-number'>
                          {[...Array(10).keys()].map((value) => (
                            <div
                              className='dropdown-list'
                              key={value}
                              onClick={() => {
                                const updatedItems = [...groupedCartItems];
                                const itemIndex = updatedItems.findIndex(
                                  (item) =>
                                    item.item.name === groupedItem.item?.name
                                );
                                if (itemIndex !== -1) {
                                  updatedItems[itemIndex].count = value + 1;
                                  updateGroupedCartItems(updatedItems);
                                  // Reset dropdown after selection
                                  setGroupedDropdowns((prevState) => ({
                                    ...prevState,
                                    [groupedItem.item?.name]: false,
                                  }));
                                }
                              }}
                            >
                              {value + 1}
                            </div>
                          ))}
                          <div
                            className='dropdown-delete'
                            data-value={0}
                            onClick={() => {
                              removeFromCart(groupedItem.item?.name);
                              // Reset dropdown after deletion
                              setGroupedDropdowns((prevState) => ({
                                ...prevState,
                                [groupedItem.item?.name]: false,
                              }));
                            }}
                          >
                            0 (delete)
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
          <div className='cart-summary'>
            <p className='total-items'>Total Items: {totalItemCount}</p>
            <p className='total-price'>Total Price: ₹ {totalPrice.toFixed(2)}</p>
            <div className='cart-actions'>
              <button className='clear-cart' onClick={clearCart}>
                Clear Cart
              </button>
              <button className='buy-now' onClick={buyItem}>
                Buy Now
              </button>
            </div>
          </div>
          <Modal
            isOpen={isModalOpen}
            message='Order Placed!'
            onClose={() => setModalOpen(false)}
            />
        </>
      )}
    </div>
  );
}

export default observer(Cart);
