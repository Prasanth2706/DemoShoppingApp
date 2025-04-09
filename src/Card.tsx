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
  const [currentPage, setCurrentPage] = useState<number>(1); // Current page
  const itemsPerPage = 6; // Number of items per page

  const fetchProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data: Product[] = await response.json();
      setProducts(data); // Load all products at once
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const handleAddToFavourites = (product: Product) => {
    if (!favourites.some((fav) => fav.id === product.id)) {
      setFavourites([...favourites, product]);
      toast.success(`${product.title} added to favourites!`);
    }
  };

  const handleRemoveFromFavourites = (productId: number) => {
    setFavourites(favourites.filter((fav) => fav.id !== productId));
  };

  // Pagination logic
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
        {currentProducts.map((data) => (
          <div
            key={data.id} // Use a unique key for each product
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
                  onClick={() => handleCart(data)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="pagination flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            className={`px-4 py-2 mx-1 rounded-md ${
              currentPage === index + 1
                ? 'bg-blue-500 text-white'
                : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-400 hover:text-white transition`}
            onClick={() => handlePageChange(index + 1)}
          >
            {index + 1}
          </button>
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
