import { useState } from "react";
import "../styles/login.scss";
import { FcGoogle } from "react-icons/fc";
import toast from "react-hot-toast";
import { GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

import { useUserMutation } from "../redux/Api/userApi";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import { ResponceOFNewUser } from "../types/userTypes/newUser";
import { auth } from "../firebase";
const Login = () => {
  const [gender, setGender] = useState("");
  const [date, setDate] = useState("");
  const [login] = useUserMutation();
  const loginHandeler = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      const res = await login({
        _id: user.uid,
        name: user.displayName as string,
        email: user.email as string,
        photo: user.photoURL as string,

        gender: gender,
        dob: date,
      });
      if ("data" in res) {
        toast.success(res.data.message);
      } else {
        const error = res.error as FetchBaseQueryError;
        const message = error.data as ResponceOFNewUser;
        toast.error(message.message);
      }
    } catch (error) {
      toast.error("Login faild");
    }
  };

  return (
    <div className="mainDiv">
      <div className="login">
        <h1>Login</h1>
        <main>
          {" "}
          <div className="">
            <label htmlFor="">Gender</label>
            <select
              name="gender"
              id=""
              value={gender}
              onChange={(e) => setGender(e.target.value)}
            >
              <option value="" selected>
                Select Gender
              </option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="">
            <label htmlFor="">Date of Birth</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className="">
            <h4>Already Signed In Once</h4>
            <button onClick={loginHandeler}>
              <FcGoogle /> Sign in with Google
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Login;
