import { observer } from "mobx-react-lite";
// import { useQuery } from "react-query";

import useProducts from "./fetchProdData";
// const fetchdata = async () => {
//   try {
//     const response = await fetch('https://fakestoreapi.com/products');
//     const data = await response.json();
//     return data;
//   } catch (error) {
//     console.log('Error fetching data:', error);
//     return [];
//   }
// }

// const fetchProducts = async () => {
//   const response = await fetch('https://fakestoreapi.com/products');
//   if (!response.ok) {
//     throw new Error('Network response was not ok');
//   }
//   return response.json();
// };

const ProductList = () => {
  const { data, error, isLoading } = useProducts();
  // const { data, error, isLoading } = useQuery('products', fetchProducts);  

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      {data.map((product) => (
        <div key={product.id}>
          <p>{product.title}</p>
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

export default observer(ProductList);