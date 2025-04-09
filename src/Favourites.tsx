import React from 'react';
import { toast } from 'react-toastify';

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
};

interface FavouritesProps {
  favourites: Product[];
  onRemove: (productId: number) => void;
}

const Favourites: React.FC<FavouritesProps> = ({ favourites, onRemove }) => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-4">Favourites</h2>
      {favourites.length === 0 ? (
        <p className="text-gray-500">No items in favourites.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
          {favourites.map((fav) => (
            <div
              key={fav.id}
              className="bg-white shadow-md rounded-lg p-4 hover:shadow-lg transition-transform transform hover:scale-105"
            >
              <div className="prod-category text-sm text-gray-500 mb-2">
                {fav?.category}
              </div>
              <div className="prod-image">
                <img
                  className="w-full h-48 object-cover rounded-md"
                  src={fav?.image}
                  alt="product."
                />
              </div>
              <div className="prod-info mt-4">
                <div className="prod-title">
                  <h3 className="text-lg font-semibold text-gray-800">
                    {fav?.title}
                  </h3>
                </div>
                <div className="prod-price text-xl font-bold text-blue-600 mt-2">
                  ₹ {fav?.price}
                </div>
                <button
                  className="mt-4 w-full bg-red-500 text-white py-2 rounded-md hover:bg-red-600 transition px-2"
                  onClick={() => onRemove(fav.id)}
                >
                  Remove from Favourites
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favourites;