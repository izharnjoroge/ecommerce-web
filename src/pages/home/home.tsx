import { useEffect, useState } from "react";
import supabase from "../../config/client";
import { dataInterface } from "../../interface/data";

const home = () => {
  const [error, setError] = useState<String | null>();
  const [products, setProducts] = useState<dataInterface[] | null>();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase.from("shop_items").select();

      if (error) {
        setError("Error fetching data");
        setProducts(null);
      }
      if (data) {
        setError(null);
        setProducts(data);
      }
    };

    fetchProducts();
  }, []);
  return (
    <div>
      {products && (
        <div>
          {products.map((product) => (
            <div>
              <h1>{product.title}</h1>
              <p>{product.description}</p>
              <h2>{product.created_at.toString()}</h2>
              <h3>{product.amount}</h3>
              <h4>{product.rating}</h4>
            </div>
          ))}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default home;
