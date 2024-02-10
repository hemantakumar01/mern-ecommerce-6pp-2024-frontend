import { FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import "../styles/shipping.scss";
import { useDispatch, useSelector } from "react-redux";
import { CartInitialType } from "../types/productType";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { saveShippingInfo } from "../redux/cartReducer";

const Shipping = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { orderItem: products, total } = useSelector(
    (state: { cartReducer: CartInitialType }) => state.cartReducer
  );

  useEffect(() => {
    if (products.length <= 0) {
      navigate("/");
    }
  }, [products]);

  const [address, setAddress] = useState<string>("");
  const [pinCode, setPinCode] = useState<number>(0);
  const [state, setState] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");

  const handleSubmite = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(saveShippingInfo({ address, pinCode, state, city, country }));
    const { data } = await axios.post(
      `${import.meta.env.VITE_BASE_URL}/api/v1/payment/create`,
      { amount: total }
    );
    if (data.success) {
      dispatch(saveShippingInfo({ address, pinCode, state, city, country }));

      navigate("/pay", {
        state: data.clientSecret,
      });
    }
  };
  return (
    <div className="shipping">
      <button>
        <BiArrowBack />
      </button>
      <form action="" onSubmit={handleSubmite}>
        <h1>Shipping Adderss</h1>
        <input
          type="text"
          required
          name="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="Address"
        />
        <input
          type="text"
          required
          name="city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="City"
        />
        <input
          type="text"
          required
          name="state"
          value={state}
          onChange={(e) => setState(e.target.value)}
          placeholder="State"
        />
        <select
          name="country"
          id=""
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        >
          <option selected value={""}>
            Chosse Country
          </option>
          <option selected value={"India"}>
            India
          </option>
        </select>
        <input
          type="number"
          required
          name="pinCode"
          value={pinCode}
          onChange={(e) => setPinCode(Number(e.target.value))}
          placeholder="Pin-Code"
        />
        <button>Pay Now</button>
      </form>
    </div>
  );
};

export default Shipping;
