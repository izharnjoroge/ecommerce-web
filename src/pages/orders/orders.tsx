import { useQuery } from "@tanstack/react-query";
import { fetchOrders, fetchProduct } from "../../functions";
import "./orders.scss";
export default function Orders() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;
  return (
    <main className="order-page">
      <h1>Orders</h1>
      {data!.map((e) => (
        <div className="items">
          <div className="order-items-parent">
            <div className="order-items">
              {e.items.map((item) => (
                <div className="order-items-list">
                  <img src={item.image} height={70} width={70} />
                  <h3>{item.name}</h3>
                  <h3>{item.amount}</h3>
                </div>
              ))}
            </div>
          </div>
          <h2>
            Order Amount: KSH{" "}
            {e.amount.toLocaleString("en-US", {
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
            })}
          </h2>
          <h2>Completed: {e.completed ? "true" : "false"}</h2>
        </div>
      ))}
    </main>
  );
}
