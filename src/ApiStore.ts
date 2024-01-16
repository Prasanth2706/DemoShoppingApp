import { action, makeObservable, observable } from 'mobx';

interface Product {
  id: number;
  title: string;
}

class ProductStore {
  title: Product[] = [];
  count: number = 0;
  cartstore: Product[] = [];

  constructor() {
    makeObservable(this, {
      title: observable,
      count: observable,
      cartstore: observable,
      handleCount: action,
      removeFromCart: action,
    });
  }

  handleCount(): void {
    this.count = this.count + 1;
  }

  removeFromCart(itemId: number): void {
    this.cartstore = this.cartstore.filter((item) => item.id !== itemId);
  }
}

const productStore = new ProductStore();

export { Product, ProductStore };
export default productStore;
