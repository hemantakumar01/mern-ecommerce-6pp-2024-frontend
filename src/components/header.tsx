import { Link } from "react-router-dom";
import { FaCartArrowDown, FaSearch, FaSignInAlt, FaUser } from "react-icons/fa";
import { useState } from "react";
import "../styles/header.scss";
import { NewUSer } from "../types/userTypes/newUser";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import toast from "react-hot-toast";

interface proptypes {
  user: NewUSer | null;
}
const Header = ({ user }: proptypes) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  // const dispatch = useDispatch();

  const closeMenu = () => {
    setIsOpen(false);
  };
  const signOutFunc = async () => {
    try {
      closeMenu();
      await signOut(auth);
      toast.success("Sign Out");
      window.location.reload();
    } catch (error) {
      toast.error("Failed");
    }
  };
  return (
    <nav className="header">
      <Link onClick={closeMenu} to={"/"}>
        Home
      </Link>
      <Link onClick={closeMenu} to={"/admin/dashboard"}>
        Dashboard
      </Link>
      <Link onClick={closeMenu} to={"/product/order"}>
        About
      </Link>
      <Link onClick={closeMenu} to={"/cart"}>
        <FaCartArrowDown />
      </Link>
      <Link onClick={closeMenu} to={"/search"}>
        <FaSearch />
      </Link>
      {user?._id ? (
        <>
          <button onClick={() => setIsOpen((prev) => !prev)}>
            <FaUser />
          </button>
          <dialog open={isOpen}>
            <div>
              {user.role === "admin" && (
                <Link onClick={closeMenu} to={"/admin/dashboard"}>
                  Dashboard
                </Link>
              )}
              <Link onClick={closeMenu} to={"/orders"}>
                Orders
              </Link>
              <Link onClick={signOutFunc} to={"/"}>
                Logout
              </Link>
            </div>
          </dialog>
        </>
      ) : (
        <>
          <Link to={"/login"}>
            <FaSignInAlt />
          </Link>
        </>
      )}
    </nav>
  );
};

export default Header;
