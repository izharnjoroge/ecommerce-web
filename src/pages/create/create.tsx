import { useState } from "react";
import supabase from "../../config/client";
import { useNavigate } from "react-router-dom";
import "./create.scss";
import { dataInterface } from "../../interface/data";

const Create = () => {
  //Navigation
  const navigate = useNavigate();

  // state
  const [formData, setFormData] = useState<dataInterface | null>();
  const [formError, setFormError] = useState<String | null>();
  const [imageFile, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | "">();

  //Functions
  //upload images
  async function uploadFile(file: File) {}

  //update state variables
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData!,
      [name]: value,
    });
  };

  //convert image to url
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fls = e.target.files as FileList;
    const file = fls[0];
    setImageName(file.name);
    if (file && file.size <= 1024 * 1024 * 2) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setSelectedImage(reader.result as string);
      };
      setFile(file as File);
    } else {
      alert("Please select an image smaller than 2 MB.");
      return;
    }
  };

  //submit data to db
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { data, error } = await supabase.storage
      .from("test")
      .upload(imageName!, imageFile!);
    if (error) {
      alert("error uploading file");
      return;
    }
    if (data) {
      const publicUrl = supabase.storage.from("test").getPublicUrl(imageName!);
      const image = publicUrl.data.publicUrl;
      const { title, description, amount, rating } = formData!;
      const { data, error } = await supabase.from("shop_items").insert([
        {
          title,
          description,
          amount,
          rating,
          image,
        },
      ]);
      if (error) {
        setFormError("Error setting record");
        return;
      }
      if (data) {
      }

      setFormData(null);
      setFormError(null);
      alert("product added successfully");
      navigate("/home");
    }
  };

  //delete image
  const handleClick = () => {
    setSelectedImage(null);
    setFile(null);
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
              value={formData?.title ?? ""}
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
              value={formData?.description ?? ""}
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
              value={formData?.amount ?? ""}
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
              value={formData?.rating ?? ""}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <label>Image: </label>
          <label>
            *The image size limit is
            <strong> 2 MB</strong>
          </label>
          <div>
            {!selectedImage ? (
              <input
                name="image"
                className="form-inputs"
                type="file"
                accept="image/*"
                value={formData?.image ?? ""}
                required
                onChange={handleImageChange}
              />
            ) : (
              <button onClick={handleClick}>
                <img
                  src={selectedImage ?? ""}
                  alt={imageName}
                  width={200}
                  height={200}
                />
              </button>
            )}
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
