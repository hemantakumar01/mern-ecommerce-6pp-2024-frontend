import { FaTrash } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { NewOrderTYP, orderItems } from "../../../types/orderTypes";
import { useSelector } from "react-redux";
import { userReducerInitialType } from "../../../types/user-reducer-type";
import {
  useDeleteOrderMutation,
  useGetSingleOrderQuery,
  useUpdateOrderMutation,
} from "../../../redux/Api/orderApi";
import { CustomError } from "../../../types/productType";
import toast from "react-hot-toast";
import { responceData } from "../../../utils/responceData";
import { Sketch } from "../../../components/loader";

const img =
  "https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8&w=1000&q=804";

const orderItems: orderItems[] = [
  {
    name: "Puma Shoes",
    photo: img,
    id: "asdsaasdas",
    quantity: 4,
    price: 2000,
  },
];
const defaltOrder: NewOrderTYP = {
  _id: "",
  discount: 0,
  shippingCharges: 0,
  status: "",
  subTotal: 0,
  tax: 0,
  total: 0,
  user: "",

  orderItem: [
    {
      name: "",
      photo: "",
      price: 0,
      productId: "",
      quantity: 0,
    },
  ],
  shippingInfo: {
    address: "",
    city: "",
    country: "",
    pinCode: 0,
    state: "",
  },
};
const TransactionManagement = () => {
  const id = useParams().id;
  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();
  const navigate = useNavigate();

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { isLoading, data, error } = useGetSingleOrderQuery({
    userId: user?._id!,
    productId: id!,
  });
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
    navigate("/admin/transaction");
  }
  const {
    _id,
    discount,
    shippingCharges,
    status,
    subTotal,
    tax,
    total,
    user: dataBaseuser,
    shippingInfo: { address, city, country, pinCode, state },
    orderItem,
  } = data?.order! || defaltOrder;

  // const [order, setOrder] = useState({
  //   _id,
  //   discount,
  //   shippingCharges,
  //   status,
  //   subTotal,
  //   tax,
  //   total,
  //   dataBaseuser,
  //   orderItems,
  // });

  const updateHandler = async () => {
    const res = await updateOrder({ productId: _id!, userId: dataBaseuser! });
    responceData(res, navigate, "/admin/transaction");
  };
  const deleteHandler = async () => {
    const res = await deleteOrder({ productId: _id!, userId: dataBaseuser! });
    responceData(res, navigate, "/admin/transaction");
  };

  const ProductCard = ({ name, photo, price, quantity, id }: orderItems) => {
    return (
      <div className="transaction-product-card">
        <img src={photo} alt={name} />
        <Link to={`/product/${id}`}>{name}</Link>
        <span>
          ₹{price} X {quantity} = ₹{price * quantity}
        </span>
      </div>
    );
  };
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Sketch />
      ) : (
        <main className="product-management">
          <section
            style={{
              padding: "2rem",
            }}
          >
            <h2>Order Items</h2>

            {orderItem.map((i) => (
              <ProductCard
                key={i.productId}
                name={i.name}
                photo={i.photo}
                id={i.productId}
                quantity={i.quantity}
                price={i.price}
              />
            ))}
          </section>

          <article className="shipping-info-card">
            <button className="product-delete-btn" onClick={deleteHandler}>
              <FaTrash />
            </button>
            <h1>Order Info</h1>
            <h5>User Info</h5>
            <p>Name: {id}</p>
            <p>
              Address: {`${address}, ${city}, ${state}, ${country} ${pinCode}`}
            </p>
            <h5>Amount Info</h5>
            <p>Subtotal: {subTotal}</p>
            <p>Shipping Charges: {shippingCharges}</p>
            <p>Tax: {tax}</p>
            <p>Discount: {discount}</p>
            <p>Total: {total}</p>

            <h5>Status Info</h5>
            <p>
              Status:{" "}
              <span
                className={
                  status === "Delivered"
                    ? "purple"
                    : status === "Shipped"
                    ? "green"
                    : "red"
                }
              >
                {status}
              </span>
            </p>
            <button className="shipping-btn" onClick={updateHandler}>
              Process Status
            </button>
          </article>
        </main>
      )}
    </div>
  );
};

export default TransactionManagement;
