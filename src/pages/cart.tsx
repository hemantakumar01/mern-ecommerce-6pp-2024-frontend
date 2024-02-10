import { useEffect, useState } from "react";
import "../styles/cart.scss";
import CartItemCart from "../components/cartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartInitialType, CartItem } from "../types/productType";
import {
  addCartItem,
  calculatePrice,
  discountOnCoupon,
  removeFromCart,
} from "../redux/cartReducer";
import axios from "axios";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    discount,
    shippingCharges,
    subTotal,
    tax,
    total,
    orderItem: products,
  } = useSelector(
    (state: { cartReducer: CartInitialType }) => state.cartReducer
  );
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState<string>("");
  const [isValid, setIsValid] = useState<boolean>(false);
  // const {orderItem:stateOrderItem} = useSelector((state:{cartReducer:CartInitialType})=>state.cartReducer)
  const increment = (cartItem: CartItem) => {
    if (cartItem.quantity === cartItem.stock) return;

    dispatch(addCartItem({ ...cartItem, quantity: cartItem.quantity + 1 }));
  };
  const decrement = (cartItem: CartItem) => {
    if (cartItem.quantity === 1) return;

    dispatch(addCartItem({ ...cartItem, quantity: cartItem.quantity - 1 }));
  };
  const deleteItem = (id: string) => {
    dispatch(removeFromCart(id));
  };
  useEffect(() => {
    dispatch(calculatePrice());
  }, [products]);
  const { token } = axios.CancelToken.source();
  const validateCoupon = () => {
    axios
      .get(
        `${
          import.meta.env.VITE_BASE_URL
        }/api/v1/payment/discount?id=hfgvfufufujvv1&code=${couponCode}`,
        { cancelToken: token }
      )
      .then((res) => {
        console.log(res.data);
        if (res.data.success) {
          toast.success(`Discount Applied of RS-${res.data.discount}`);
          setIsValid(true);
          dispatch(discountOnCoupon(res.data.discount));
        }
      })
      .catch(() => {
        setIsValid(false);
        dispatch(discountOnCoupon(0));
      });
    return;
  };
  useEffect(() => {
    validateCoupon();
  }, [couponCode]);
  return (
    <div className="cart">
      <main
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
          height: "100%",
        }}
      >
        {products.length > 0 ? (
          products.map((p, index) => (
            <CartItemCart
              increment={increment}
              decrement={decrement}
              deleteItem={deleteItem}
              products={p}
              key={index}
            />
          ))
        ) : (
          <div className="">No Product Found</div>
        )}
      </main>
      <aside>
        <p>Subtotal: ₹{subTotal}</p>
        <p>Shipping Charges: ₹{shippingCharges}</p>
        <p>Tax: ₹{tax}</p>
        <p>
          Discount: <em className="red">₹{discount}</em>
        </p>
        <b>
          Total: <b>₹{total}</b>
        </b>
        <input
          type="text"
          placeholder="Apply Code"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
        />
        {couponCode &&
          (isValid ? (
            <span className="green">
              ₹{discount} of on coupon <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">Coupon is not valid</span>
          ))}
        {products.length > 0 && <Link to={`/product/shipping`}>Checkout</Link>}
      </aside>
    </div>
  );
};

export default Cart;
