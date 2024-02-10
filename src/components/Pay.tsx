import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { CartInitialType } from "../types/productType";
import { userReducerInitialType } from "../types/user-reducer-type";
import { useCreateOrderMutation } from "../redux/Api/orderApi";
import { responceData } from "../utils/responceData";
const stripePromise = loadStripe(`${import.meta.env.VITE_STRIPE_PUBLISH_KEY}`);

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const [createOrder] = useCreateOrderMutation();
  const [isProccessing, setIsProcessing] = useState<boolean>(false);
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );
  const {
    discount,
    orderItem,
    shippingCharges,
    shippingInfo,
    subTotal,
    tax,
    total,
  } = useSelector(
    (state: { cartReducer: CartInitialType }) => state.cartReducer
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const orderBodyType = {
      shippingInfo,

      user: user?._id!,
      subTotal,
      tax,
      total,
      shippingCharges,
      discount,
      orderItem,
    };
    setIsProcessing(true);
    if (!stripe || !elements) {
      return;
    }

    const { paymentIntent, error } = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
      redirect: "if_required",
    });

    if (error) {
      // Show error to your customer (for example, payment details incomplete)
      toast.error(error.message || "Error Occured");
      setIsProcessing(false);
    }
    if (paymentIntent?.status === "succeeded") {
      const res = await createOrder(orderBodyType);
      responceData(res, null, "");
      navigate("/product/order");
      toast.success("Order Placed");
      setIsProcessing(false);
    }
  };
  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      <button type="submit" disabled={!stripe}>
        {isProccessing ? "Proccessing..." : "Pay"}
      </button>
    </form>
  );
};
const Pay = () => {
  const location = useLocation();

  const clientSecret: string | undefined = location.state;
  if (!clientSecret) return <Navigate to={"/shipping"} />;
  const options = {
    clientSecret,
  };
  return (
    <div className="payment">
      <Elements stripe={stripePromise} options={options}>
        <CheckoutForm />
      </Elements>
    </div>
  );
};

export default Pay;
