import { observer } from "mobx-react-lite";
import useProducts from "./fetchProdData";
import { toast } from "react-toastify";

const ProductList = () => {
  const { data, error, isLoading } = useProducts();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    toast.error("Failed to fetch products!");
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