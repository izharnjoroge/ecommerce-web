import { dataInterface } from "../../interface/data";
import ItemsCard from "../../components/card/items";
import "./home.scss";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProducts } from "../../functions";

// const home = () => {
//   const [error, setError] = useState<String | null>();
//   const [products, setProducts] = useState<dataInterface[] | null>();

//   const handleDelete = (id: number) => {
//     setProducts((prevProduct) => {
//       return prevProduct?.filter((product) => product.id !== id);
//     });
//   };

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const { data, error } = await supabase.from("shop_items").select();

//       if (error) {
//         setError("Error fetching data");
//         setProducts(null);
//       }
//       if (data) {
//         setError(null);
//         setProducts(data);
//       }
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div>
//       {products && (
//         <div className="items">
//           {products.map((product) => (
//             <div key={product.id} className="items-grid">
//               <ItemsCard
//                 id={product.id}
//                 created_at={product.created_at}
//                 title={product.title}
//                 description={product.description}
//                 amount={product.amount}
//                 rating={product.rating}
//                 onDelete={handleDelete}
//               />
//             </div>
//           ))}
//         </div>
//       )}
//       {error && <div>{error}</div>}
//     </div>
//   );
// };

// export default home;

export default function home() {
  //Query Client To Trigger a refresh
  const queryClient = useQueryClient();

  //Query
  const { isPending, error, data } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const products: dataInterface[] = data || [];

  const handleDelete = () => {
    queryClient.invalidateQueries({ queryKey: ["products"] });
  };

  return (
    <div>
      {products && (
        <div className="items">
          {products.map((product) => (
            <div key={product.id} className="items-grid">
              <ItemsCard
                id={product.id}
                created_at={product.created_at}
                title={product.title}
                description={product.description}
                amount={product.amount}
                rating={product.rating}
                onDelete={handleDelete}
              />
            </div>
          ))}
        </div>
      )}
      {error && <div>{error}</div>}
    </div>
  );
}
