import { useState } from "react";
import supabase from "../../config/client";
import { useNavigate } from "react-router-dom";
import "./create.scss";
import { categoriesInterface } from "../../interface/data";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../../functions";

export default function Create() {
  //Navigation
  const navigate = useNavigate();

  // state
  // const [formData, setFormData] = useState<dataInterface | null>();
  const [imageFile, setFile] = useState<File | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | "">();

  //Get categories because of category ids
  const { isPending, error, data } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });

  //update state variables
  // const handleChange = (
  //   e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  // ) => {
  //   const { name, value } = e.target;
  //   setFormData({
  //     ...formData!,
  //     [name]: value,
  //   });
  // };

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
    const name = (
      e.currentTarget.elements.namedItem("title") as HTMLInputElement
    ).value;
    const description = (
      e.currentTarget.elements.namedItem("description") as HTMLInputElement
    ).value;
    const amount = (
      e.currentTarget.elements.namedItem("amount") as HTMLInputElement
    ).value;
    const rating = (
      e.currentTarget.elements.namedItem("rating") as HTMLInputElement
    ).value;
    const categoryId = (
      e.currentTarget.elements.namedItem("category") as HTMLSelectElement
    ).value;
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

      const { data, error } = await supabase.from("items").insert([
        {
          name,
          description,
          image,
          amount,
          rating,
          categoryId,
        },
      ]);
      if (error) {
        alert(error.message);
        return;
      }
      if (data) {
      }
      setSelectedImage(null);
      setFile(null);
      setImageName("");
      alert("product added successfully");
      navigate("/");
    }
  };

  //delete image
  const handleClick = () => {
    setSelectedImage(null);
    setFile(null);
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  const categories: categoriesInterface[] = data || [];

  return (
    <div className="form-screen">
      <form onSubmit={handleSubmit} className="create-form">
        <div className="form-div">
          <label>Title:</label>
          <div>
            <input
              type="text"
              name="title"
              id="title"
              required
              className="form-inputs"
            />
          </div>
        </div>
        <div className="form-div">
          <label>Category:</label>
          <div>
            <select
              name="category"
              id="category"
              required
              className="form-inputs"
            >
              <option value="" disabled defaultValue={""} key={1}>
                Select a category
              </option>
              {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-div">
          <label>Description:</label>
          <div>
            <textarea
              name="description"
              id="description"
              maxLength={255}
              required
              className="form-inputs"
            />
          </div>
        </div>
        <div className="form-div">
          <label>Amount:</label>
          <div>
            <input name="amount" id="amount" required className="form-inputs" />
          </div>
        </div>
        <div className="form-div">
          <label>Rating:</label>
          <div>
            <input
              name="rating"
              id="rating"
              min={1}
              max={10}
              required
              className="form-inputs"
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
    </div>
  );
}
