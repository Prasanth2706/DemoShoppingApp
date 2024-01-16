import React, { useState } from 'react';
import './Cart.css';
import { observer } from 'mobx-react-lite';
import productStore from './ApiStore';
import Modal from './Modal';
import { db } from './firebase';
import useShoppingCart from './CartGroupItem';

// interface CartItem {
//   name: string;
//   description?: string;
//   rate: number;
//   image: string;
// }

// type GroupedCartItem = {
//   item: CartItem;
//   count: number;
// };

function Cart() {
  // const [groupedCartItems, setGroupedCartItems] = useState<GroupedCartItem[]>(
  //   []
  // );

  // useEffect(() =>
  //   groupAndCountItems(productStore.cartstore);
  // }, [productStore.cartstore]);

  const { groupedCartItems, updateGroupedCartItems, removeFromCart } =
    useShoppingCart(productStore.cartstore);

  const totalItemCount = groupedCartItems.reduce(
    (accumulator, currentItem) => accumulator + currentItem.count,
    0
  );
  productStore.count = totalItemCount;

  const [groupedDropdowns, setGroupedDropdowns] = useState<{
    [itemName: string]: boolean;
  }>({});

  // const groupAndCountItems = (cartItems: any) => {
  //   const groupedItems: Record<string, GroupedCartItem> = {};
  //   cartItems.forEach((item: any) => {
  //     const { name, description, rate, image } = item;

  //     if (!groupedItems[name]) {
  //       groupedItems[name] = {
  //         item: {
  //           name,
  //           description,
  //           rate,
  //           image,
  //         },
  //         count: 1,
  //       };
  //     } else {
  //       groupedItems[name].count += 1;
  //     }
  //   });
  //   setGroupedCartItems(Object.values(groupedItems));
  // };

  const toggleDropdown = (itemName: string) => {
    setGroupedDropdowns((prevState) => ({
      ...prevState,
      [itemName]: !prevState[itemName] || false,
    }));
  };

  const [isModalOpen, setModalOpen] = useState(false);

  const buyItem = () => {
    groupedCartItems.forEach((item) => {
      db.collection('posts').add({
        name: item.item.name,
        description: item.item.description || 'this is a product',
        price: item.item.rate,
        image: item.item.image,
        itemCount: item.count,
      });
    });
    setModalOpen(true);
  };

  return (
    <div className='cart'>
      <div className='cart-top'>
        <div className='cart-maintitle'>
          <p>Your Shopping Cart</p>
        </div>
      </div>
      {groupedCartItems?.length === 0 ? (
        <p className='cart-message'>Empty Cart</p>
      ) : (
        groupedCartItems?.map((groupedItem) => (
          <div
            className='cart-data'
            key={groupedItem.item.name}
          >
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
                <div className='cart-price'>{groupedItem.item?.rate}</div>
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
                          }}
                        >
                          0(delete)
                        </div>
                      </div>
                    )}
                  </div>
                  <div className='cart-second-data'>
                    <button
                      className='buy-now'
                      onClick={buyItem}
                    >
                      Buy Now
                    </button>
                    <Modal
                      isOpen={isModalOpen}
                      message='Order Placed!'
                      onClose={() => setModalOpen(false)}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default observer(Cart);
