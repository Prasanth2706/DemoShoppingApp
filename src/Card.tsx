import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { observer } from 'mobx-react-lite';
import './card.css';
import productStore from './ApiStore';
import ReactStars from 'react-rating-stars-component';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Favourites from './Favourites';

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
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [favourites, setFavourites] = useState<Product[]>([]);

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data: Product[] = await response.json();
      setProducts(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToFavourites = (product: Product) => {
    setFavourites((prevFavourites) => {
      if (!prevFavourites.some((fav) => fav.id === product.id)) {
        toast.success(`${product.title} added to favourites!`);
        return [...prevFavourites, product];
      }
      return prevFavourites;
    });
  };

  const handleRemoveFromFavourites = (productId: number) => {
    setFavourites((prevFavourites) =>
      prevFavourites.filter((fav) => fav.id !== productId)
    );
    toast.info('Item removed from favourites.');
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
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
        {products.map((data) => (
          <div
            key={data.id}
            className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105"
          >
            <div
              className="like-card absolute top-4 right-4 cursor-pointer"
              onClick={() =>
                favourites.some((fav) => fav.id === data.id)
                  ? handleRemoveFromFavourites(data.id)
                  : handleAddToFavourites(data)
              }
            >
              {favourites.some((fav) => fav.id === data.id) ? (
                <FavoriteIcon className="text-red-500 text-2xl" />
              ) : (
                <FavoriteBorderIcon className="text-gray-400 text-2xl" />
              )}
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
                  className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition px-2"
                  onClick={() => productStore.handleCount()}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Favourites Section */}
      <Favourites
        favourites={favourites}
        onRemove={handleRemoveFromFavourites}
      />
    </div>
  );
};

export default observer(Card);
