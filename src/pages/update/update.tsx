import supabase from "../../config/client";
import { useEffect, useState } from "react";
import { dataInterface } from "../../interface/data";
import "./update.scss";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchProduct, updateProduct } from "../../functions";
import { useNavigate, useParams } from "react-router-dom";

export default function Update() {
  //states
  const [formData, setFormData] = useState<dataInterface[] | []>([]);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageName, setImageName] = useState<string | "">();
  const [imageFile, setFile] = useState<File | null>(null);
  //params
  const { id } = useParams();

  // Query
  const { isPending, error, data } = useQuery({
    queryKey: ["product", id],
    queryFn: () => fetchProduct(id!),
  });

  //Get Data
  useEffect(() => {
    if (data) {
      const updateData: dataInterface[] = data || [];

      setFormData(updateData);
      setSelectedImage(updateData[0]?.image || "");
    }
  }, [data]);

  //navigation
  const navigate = useNavigate();

  //Mutation to Update
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: updateProduct,
    onSuccess: (newProduct) => {
      queryClient.setQueryData(["products"], newProduct);
      alert("Successfully updated");
      navigate("/");
    },
    onError(error) {
      alert(error);
    },
  });

  //Change Image
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

  //Change Inputs
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

  // Submit Form
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
      console.log(image);
      const { name, description, amount, rating } = formData![0];
      mutation.mutate({
        name: name,
        description: description,
        amount: amount,
        rating: rating,
        imageUrl: image,
        id: id!,
      });
    }
  };

  if (isPending) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return formData?.length === 0 ? (
    <div>Record doesn't exist</div>
  ) : (
    <div className="form-screen">
      <form className="create-form" onSubmit={handleSubmit}>
        <div className="form-div">
          <label>Title:</label>
          <div>
            <input
              type="text"
              name="title"
              className="form-inputs"
              value={formData![0].name}
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
        <div className="form-div">
          <label>Category:</label>
          <div>
            <textarea
              name="category"
              maxLength={255}
              className="form-inputs"
              value={formData![0].categoryId}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-div">
          <label>Image:</label>
          <div>
            {selectedImage && (
              <img
                src={selectedImage}
                alt={imageName}
                width={200}
                height={200}
              />
            )}
            <div>
              <input
                name="image"
                className="form-inputs"
                type="file"
                accept="image/*"
                value={""}
                onChange={handleImageChange}
              />
            </div>
          </div>
        </div>

        <button type="submit" className="form-button">
          Update
        </button>
      </form>
    </div>
  );
}
