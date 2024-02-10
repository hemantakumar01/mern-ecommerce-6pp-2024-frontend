import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

import "../styles/cartItem.scss";
import { CartItem } from "../types/productType";
type CartProps = {
  products: CartItem;
  deleteItem: (id: string) => void;
  decrement: (cartItem: CartItem) => void;
  increment: (cartItem: CartItem) => void;
};
const CartItem = ({
  products,
  decrement,
  deleteItem,
  increment,
}: CartProps) => {
  return (
    <div className="cartItem">
      <img src={products.photo} alt="" />
      <article>
        <Link to={`/product/${products.productId}`}>Mackbook</Link>
        <span>₹{products.price}</span>
      </article>
      <div className="quantity">
        <button onClick={() => decrement(products)}>-</button>
        <span>{products.quantity}</span>
        <button onClick={() => increment(products)}>+</button>
      </div>
      <button onClick={() => deleteItem(products.productId)}>
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
