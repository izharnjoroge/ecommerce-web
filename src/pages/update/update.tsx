import { useNavigate, useParams } from "react-router-dom";
import supabase from "../../config/client";
import { useEffect, useState } from "react";
import { dataInterface } from "../../interface/data";
import "./update.scss";

const Update = () => {
  const { id } = useParams();

  const [error, setError] = useState<String | null>();
  const [formData, setFormData] = useState<dataInterface[] | []>();

  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => {
      if (Array.isArray(prevFormData) && prevFormData.length > 0) {
        return [
          {
            ...prevFormData[0],
            [name]: value,
          },
        ];
      } else {
        return prevFormData;
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, description, amount, rating } = formData![0];
    console.log(title);
    console.log(description);
    const { data, error } = await supabase
      .from("shop_items")
      .update([
        {
          title,
          description,
          amount,
          rating,
        },
      ])
      .eq("id", id);
    if (error) {
      setError("Error updating product");
    }
    if (data) {
    }
    alert("Successfully update");
    navigate("/home");
  };

  useEffect(() => {
    const getRecord = async () => {
      const { data, error } = await supabase
        .from("shop_items")
        .select()
        .eq("id", id)
        .limit(1);
      if (error) {
        setError("Record Not Found!");
        navigate("/home");
      }
      if (data) {
        const updateData: dataInterface[] = data;
        setFormData(updateData);
        console.log();
      }
    };
    getRecord();
  }, [id, navigate]);

  if (!formData) {
    return <div>Loading...</div>;
  }

  return formData?.length === 0 ? (
    <div>Record doesn't exist</div>
  ) : (
    <div className="form-screen">
      <form className="create-form" onChange={handleSubmit}>
        <div className="form-div">
          <label>Title:</label>
          <div>
            <input
              type="text"
              name="title"
              className="form-inputs"
              value={formData![0].title}
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
              className="form-inputs"
              value={formData![0].description}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-div">
          <label>Amount:</label>
          <div>
            <input
              name="amount"
              className="form-inputs"
              value={formData![0].amount}
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
              className="form-inputs"
              value={formData![0].rating}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="form-button">
          Update
        </button>
      </form>
      {error && <p>{error}</p>}
    </div>
  );
};

export default Update;
