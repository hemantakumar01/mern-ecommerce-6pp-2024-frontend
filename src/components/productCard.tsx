import { FaPlus } from "react-icons/fa";
import "../styles/productCart..scss";
import { addCartItem } from "../redux/cartReducer";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
type ProductsProps = {
  name: string;
  productId: string;
  photo: string;
  price: number;
  stock: number;
  addToCartHandler?: () => void;
};

const ProductCard = ({
  name,
  productId,
  photo,
  price,
  stock,
}: ProductsProps) => {
  const dispatch = useDispatch();

  return (
    <div className="product-card">
      <img src={photo} alt={name} />
      <p>{name}</p>
      <span>₹{price}</span>

      <div>
        <button
          onClick={() => {
            dispatch(
              addCartItem({ name, productId, photo, price, stock, quantity: 1 })
            );
            toast.success("Added to Card");
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
