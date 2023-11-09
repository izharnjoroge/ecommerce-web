import { dataInterface } from "../../interface/data";
import "./items.scss";

const ItemsCard = (props: dataInterface) => {
  return (
    <div className="items-card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>

      <h6>{props.amount}</h6>
      <h6 className="item-rating">{props.rating}</h6>
    </div>
  );
};

export default ItemsCard;
