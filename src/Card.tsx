import React, { useEffect, useState } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { observer } from 'mobx-react-lite';
import './card.css';
import productStore from './ApiStore';
import ReactStars from 'react-rating-stars-component';

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

const fetchdata = async () => {
  try {
    const response = await fetch('https://fakestoreapi.com/products');
    const data: Product[] = await response.json();
    console.log(data, 'product-data');

    productStore.title = data;
  } catch (error) {
    console.log('Error fetching data:', error);
  }
};

const Card: React.FC = () => {
  useEffect(() => {
    fetchdata();
  }, []);

  const [liked, setLiked] = useState(false);
  const toggleClick = (index: number) => {
    setLiked(!liked);
    setActiveItem(index);
  };

  const [activeItem, setActiveItem] = useState<number | undefined>();



  const handleCart = (data: Product) => {
    productStore.handleCount();
    const cartItem: any = {
      name: data.title,
      image: data?.image,
      rate: data?.price,
      description: data?.description,
    };
    productStore.cartstore = [...productStore.cartstore, cartItem];
  };

  return (
    <>
      {
        productStore?.title?.map((data: any, index: number) => {
          const uniqueKey = data.id || `product_${index}`;
          return (
            <div
              className='card'
              key={uniqueKey}
            >
              <div
                className='like-card'
                onClick={() => toggleClick(index)}
              >
                <FavoriteBorderIcon
                  data-testid='like-cards'
                  className={activeItem === index ? (liked ? 'red' : '') : ''}
                />
              </div>
              <div className='prod-category'>
                <p>{data?.category}</p>
              </div>
              <div className='prod-image'>
                <img
                  className='images'
                  src={data?.image}
                  alt='product.'
                />
              </div>
              <div className='prod-info'>
                <div className='prod-title'>
                  <p>{data?.title}</p>
                </div>
                <div className='prod-price'>₹ {data?.price}</div>
                <div
                  className='prod-rating'
                  style={{ display: 'flex', alignItems: 'center' }}
                >
                  <ReactStars
                    value={data?.rating?.rate}
                    count={5}
                    size={25}
                    edit={false}
                    half={true}
                    activeColor='#ffac33'
                  />
                  <div
                    className='prod-count'
                    style={{ paddingLeft: '8px' }}
                  >
                    <p>{data?.rating.count}</p>
                  </div>
                </div>
                <div>
                  <button
                    className='add-to'
                    onClick={() => handleCart(data)}
                  >
                    Add to Cart.
                  </button>
                </div>
              </div>
            </div>
          );
        }) as React.ReactNode
      }
    </>
  );
};

export default observer(Card);
