import { Link } from "react-router-dom";
import { dataInterface } from "../../interface/data";
import "./items.scss";
import supabase from "../../config/client";
import { useState } from "react";

interface ItemsCardProps extends dataInterface {
  onDelete: (id: number) => void;
}

const ItemsCard = (props: ItemsCardProps) => {
  const [error, setError] = useState<String | null>();

  const handleDelete = async () => {
    const { data, error } = await supabase
      .from("shop_items")
      .delete()
      .eq("id", props.id);
    if (error) {
      setError("unable to delete record");
      return;
    }
    if (data) {
    }
    alert("record deleted");
    props.onDelete(props.id);
  };
  return (
    <div className="items-card">
      <h3>{props.title}</h3>
      <p>{props.description}</p>
      <h6>{props.amount}</h6>
      <h6 className="item-rating">{props.rating}</h6>
      <Link to={"/" + props.id}>
        <img
          src="edit.svg"
          alt=""
          height={20}
          width={20}
          className="icon-edit"
        />
      </Link>
      <img
        src="delete.svg"
        alt=""
        height={20}
        width={20}
        onClick={handleDelete}
        className="icon-delete"
      />
      {error && <p>{error}</p>}
    </div>
  );
};

export default ItemsCard;
