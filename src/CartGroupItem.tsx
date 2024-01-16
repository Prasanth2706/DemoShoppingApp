import { useEffect, useState } from 'react';

interface CartItem {
  name: string;
  description?: string;
  rate: number;
  image: string;
}

type GroupedCartItem = {
  item: CartItem;
  count: number;
};

const useShoppingCart = (cartItems: any) => {
  const [groupedCartItems, setGroupedCartItems] = useState<GroupedCartItem[]>([]);

  useEffect(() => {
    groupAndCountItems(cartItems);
  }, [cartItems]);

  const groupAndCountItems = (cartItems: any) => {
    const groupedItems: Record<string, GroupedCartItem> = {};
    cartItems.forEach((item: any) => {
      const { name, description, rate, image } = item;

      if (!groupedItems[name]) {
        groupedItems[name] = {
          item: {
            name,
            description,
            rate,
            image,
          },
          count: 1,
        };
      } else {
        groupedItems[name].count += 1;
      }
    });
    setGroupedCartItems(Object.values(groupedItems));
  };

  const updateGroupedCartItems = (updatedItems: GroupedCartItem[]) => {
    setGroupedCartItems(updatedItems);
  };

  const removeFromCart = (itemName: string) => {
    const updatedItems = groupedCartItems.filter(
      (item) => item.item.name !== itemName
    );
    updateGroupedCartItems(updatedItems);
  };

  return { groupedCartItems,updateGroupedCartItems,removeFromCart };
};

export default useShoppingCart;
