import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { observer } from 'mobx-react-lite';
import './card.css';
import productStore from './ApiStore';
import ReactStars from 'react-rating-stars-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Product = {
  id: number;
  title: string;
  category: string;
  image: string;
  price: number;
  rating: {
    rate: number;
    count: number;
  };
  description?: string;
};

const Card: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const itemsPerPage = 10; // Number of items to fetch per page

  const fetchProducts = async (page: number) => {
    setIsLoading(true);
    try {
      const offset = (page - 1) * itemsPerPage;
      const response = await fetch(
        `https://fakestoreapi.com/products?limit=${itemsPerPage}&offset=${offset}`
      );
      const data: Product[] = await response.json();
      setProducts((prevProducts) => [...prevProducts, ...data]); // Append new products
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage);
  }, [currentPage]);

  const handleCart = (data: Product) => {
    productStore.handleCount();
    const cartItem: any = {
      name: data.title,
      image: data?.image,
      rate: data?.price,
      description: data?.description,
    };
    productStore.cartstore = [...productStore.cartstore, cartItem];
    toast.success(`${data.title} added to cart!`);
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  if (isLoading && products.length === 0) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {[...Array(6)].map((_, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-4 animate-pulse"
          >
            <Skeleton height={200} className="rounded-md" />
            <Skeleton height={20} width="80%" className="mt-4" />
            <Skeleton height={20} width="60%" className="mt-2" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {products.map((data, index) => {
        const uniqueKey = data.id || `product_${index}`;
        return (
          <div
            key={uniqueKey}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <div
              className="like-card absolute top-4 right-4 cursor-pointer"
              onClick={() => {}}
            >
              <FavoriteBorderIcon className="text-gray-400 text-2xl" />
            </div>
            <div className="prod-category text-sm text-gray-500 mb-2">
              {data?.category}
            </div>
            <div className="prod-image">
              <img
                className="w-full h-48 object-cover rounded-md"
                src={data?.image}
                alt="product."
              />
            </div>
            <div className="prod-info mt-4">
              <div className="prod-title">
                <h3 className="text-lg font-semibold text-gray-800">
                  {data?.title}
                </h3>
              </div>
              <div className="prod-price text-xl font-bold text-blue-600 mt-2">
                ₹ {data?.price}
              </div>
              <div
                className="prod-rating flex items-center mt-2"
                style={{ display: 'flex', alignItems: 'center' }}
              >
                <ReactStars
                  value={data?.rating?.rate}
                  count={5}
                  size={20}
                  edit={false}
                  half={true}
                  activeColor="#ffac33"
                />
                <div className="prod-count text-sm text-gray-500 pl-2">
                  ({data?.rating.count})
                </div>
              </div>
              <div className="mt-4">
                <button
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition p-12 "
                  onClick={() => handleCart(data)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        );
      })}
      <button
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition mt-4"
        onClick={loadMore}
        disabled={isLoading}
      >
        {isLoading ? 'Loading...' : 'Load More'}
      </button>
    </div>
  );
};

export default observer(Card);
