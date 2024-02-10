import { FaPlus } from "react-icons/fa";
import "../styles/productCart..scss";
import { CartItem } from "../types/productType";
import { addCartItem } from "../redux/cartReducer";
import { useDispatch } from "react-redux";
type ProductsProps = {
  name: string;
  productId: string;
  photo: string;
  price: number;
  stock: number;
  addToCartHandler: (cartItem: CartItem) => string | undefined;
};

const ProductCard = ({
  name,
  productId,
  photo,
  price,
  stock,
  addToCartHandler,
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
          }}
        >
          <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
