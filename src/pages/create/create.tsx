import { useState } from "react";
import supabase from "../../config/client";
import { useNavigate } from "react-router-dom";
import "./create.scss";
const Create = () => {
  // const[title,setTitle] = useState<String|null>();
  // const[description,setDescription] = useState<String|null>();
  // const[amount,setAmount] = useState<String|null>();
  // const[rating,setRating] = useState<String|null>();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    rating: "",
  });
  const [formError, setFormError] = useState<String | null>();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, amount, rating } = formData;
    const { data, error } = await supabase.from("shop_items").insert([
      {
        title,
        description,
        amount,
        rating,
      },
    ]);
    if (error) {
      setFormError("Error setting record");
      return;
    }
    if (data) {
      setFormError(null);
      console.log(data);
    }

    setFormData({
      title: "",
      description: "",
      amount: "",
      rating: "",
    });
    setFormError(null);
    navigate("/");
  };

  return (
    <div className="form-screen">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-div">
          <label>Title:</label>
          <div>
            <input
              type="text"
              name="title"
              required
              className="form-inputs"
              value={formData.title}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-div">
          <label>Description:</label>
          <div>
            <textarea
              name="description"
              maxLength={255}
              required
              className="form-inputs"
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-div">
          <label>Amount:</label>
          <div>
            <input
              name="amount"
              required
              className="form-inputs"
              value={formData.amount}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-div">
          <label>Rating:</label>
          <div>
            <input
              name="rating"
              min={1}
              max={10}
              required
              className="form-inputs"
              value={formData.rating}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          Submit
        </button>
      </form>
      {formError && <p>{formError}</p>}
    </div>
  );
};

export default Create;
