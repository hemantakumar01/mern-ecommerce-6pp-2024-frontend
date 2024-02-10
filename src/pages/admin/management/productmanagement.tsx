import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { useNavigate, useParams } from "react-router-dom";
import {
  useDeleteProductMutation,
  useSingleProductQuery,
  useUpdateProductMutation,
} from "../../../redux/Api/product";
import toast from "react-hot-toast";
import { userReducerInitialType } from "../../../types/user-reducer-type";
import { useSelector } from "react-redux";
import { responceData } from "../../../utils/responceData";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const Productmanagement = () => {
  const id = useParams().id;
  const { data } = useSingleProductQuery(id as string);
  const navigate = useNavigate();

  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const [price, setPrice] = useState<number>(2000);
  const [stock, setStock] = useState<number>(10);
  const [name, setName] = useState<string>("Puma Shoes");
  const [photo, setPhoto] = useState<string>(img);
  const [category, setCategory] = useState<string>("footwear");

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>(photo);
  const [photoFile, setPhotoFile] = useState<File>();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };
  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!categoryUpdate || !nameUpdate || !stockUpdate || !priceUpdate) {
      toast.error("All feilds required");
    } else {
      const formData = new FormData();
      formData.set("name", nameUpdate);
      formData.set("category", categoryUpdate);
      formData.set("stock", stockUpdate.toString());
      formData.set("price", priceUpdate.toString());
      formData.set("photo", photoFile!);
      const res = await updateProduct({
        _id: user?._id!,
        formData,
        productId: id!,
      });
      responceData(res, null, "");
    }
  };

  useEffect(() => {
    if (data) {
      console.log(data);
      setCategory(data.product.category);
      setPrice(data.product.price);
      setName(data.product.name);
      setPhoto(data.product.photo);
      setStock(data.product.stock);

      setCategoryUpdate(data.product.category);
      setPriceUpdate(data.product.price);
      setNameUpdate(data.product.name);
      setPhotoUpdate(data.product.photo);
      setStockUpdate(data.product.stock);
    }
  }, [data]);
  const handleTrash = async () => {
    const res = await deleteProduct({ _id: user?._id!, productId: id! });
    responceData(res, null, "");
    navigate(-1);
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main className="product-management">
        <section>
          <strong>ID - {id}</strong>
          <img
            src={`${import.meta.env.VITE_BASE_URL}/${photo}`}
            alt="Product"
          />
          <p>{name}</p>
          {stock > 0 ? (
            <span className="green">{stock} Available</span>
          ) : (
            <span className="red"> Not Available</span>
          )}
          <h3>₹{price}</h3>
        </section>
        <article>
          <button className="product-delete-btn" onClick={handleTrash}>
            <FaTrash />
          </button>
          <form onSubmit={submitHandler}>
            <h2>Manage</h2>
            <div>
              <label>Name</label>
              <input
                type="text"
                placeholder="Name"
                value={nameUpdate}
                onChange={(e) => setNameUpdate(e.target.value)}
              />
            </div>
            <div>
              <label>Price</label>
              <input
                type="number"
                placeholder="Price"
                value={priceUpdate}
                onChange={(e) => setPriceUpdate(Number(e.target.value))}
              />
            </div>
            <div>
              <label>Stock</label>
              <input
                type="number"
                placeholder="Stock"
                value={stockUpdate}
                onChange={(e) => setStockUpdate(Number(e.target.value))}
              />
            </div>

            <div>
              <label>Category</label>
              <input
                type="text"
                placeholder="eg. laptop, camera etc"
                value={categoryUpdate}
                onChange={(e) => setCategoryUpdate(e.target.value)}
              />
            </div>

            <div>
              <label>Photo</label>
              <input type="file" onChange={changeImageHandler} />
            </div>

            {photoUpdate && (
              <img
                src={`${import.meta.env.VITE_BASE_URL}/${photo}`}
                alt="New Image"
              />
            )}
            <button type="submit">Update</button>
          </form>
        </article>
      </main>
    </div>
  );
};

export default Productmanagement;
