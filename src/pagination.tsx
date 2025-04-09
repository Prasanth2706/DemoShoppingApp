import React, { useEffect, useState } from 'react';

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [allProducts, setAllProducts] = useState<Product[]>([]); // Store all products
  const itemsPerPage = 10; // Number of items to display per page

  const fetchAllData = async () => {
    try {
      const response = await fetch(`https://fakestoreapi.com/products`);
      const data: Product[] = await response.json();
      setAllProducts(data); // Store all products
      setProducts(data.slice(0, itemsPerPage)); // Display the first page
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const loadMore = (): void => {
    const nextPage = currentPage + 1;
    const startIndex = currentPage * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    // Append the next set of products
    setProducts((prevProducts) => [
      ...prevProducts,
      ...allProducts.slice(startIndex, endIndex),
    ]);
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div>
      <h1>Product List</h1>
      <div>
        {products.map((product) => (
          <div key={product.id}>
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p>Price: ₹{product.price}</p>
          </div>
        ))}
      </div>
      {products.length < allProducts.length && ( // Show "Load More" only if there are more items
        <button onClick={loadMore}>Load More</button>
      )}
    </div>
  );
};

export default App;