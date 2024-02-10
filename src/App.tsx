import "./styles/app.scss";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense, useEffect } from "react";
import Loader from "./components/loader";
import Header from "./components/header";
import Shipping from "./components/shipping";
import { Toaster } from "react-hot-toast";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { getUserExist } from "./redux/Api/userApi";
import { useDispatch, useSelector } from "react-redux";
import { userExixt, userNotExixt } from "./redux/userReducer";
import { userReducerInitialType } from "./types/user-reducer-type";
import ProctedRoute from "./components/admin/ProctedRoute";
const Home = lazy(() => import("./pages/home"));
const Search = lazy(() => import("./pages/search"));
const PageNotFound = lazy(() => import("./pages/page-not-found"));
const Pay = lazy(() => import("./components/Pay"));
// Admin Route Importing
const Dashboard = lazy(() => import("./pages/admin/dashboard"));
const Products = lazy(() => import("./pages/admin/products"));
const Customers = lazy(() => import("./pages/admin/customers"));
const Transaction = lazy(() => import("./pages/admin/transaction"));
const Barcharts = lazy(() => import("./pages/admin/charts/barcharts"));
const Piecharts = lazy(() => import("./pages/admin/charts/piecharts"));
const Linecharts = lazy(() => import("./pages/admin/charts/linecharts"));
const Coupon = lazy(() => import("./pages/admin/apps/coupon"));
const Stopwatch = lazy(() => import("./pages/admin/apps/stopwatch"));
const Toss = lazy(() => import("./pages/admin/apps/toss"));
const NewProduct = lazy(() => import("./pages/admin/management/newproduct"));
const ProductManagement = lazy(
  () => import("./pages/admin/management/productmanagement")
);
const TransactionManagement = lazy(
  () => import("./pages/admin/management/transactionmanagement")
);
const Login = lazy(() => import("./components/login"));
const Cart = lazy(() => import("./pages/cart"));
const Orders = lazy(() => import("./pages/orders"));
const App = () => {
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const data = await getUserExist(user.uid);
        dispatch(userExixt(data.user));
      } else {
        userNotExixt();
      }
    });
  }, []);
  const dispatch = useDispatch();
  const { user, loading } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  return loading ? (
    <Loader />
  ) : (
    <Router>
      <Suspense fallback={<Loader />}>
        <Toaster position="bottom-center" />

        <Header user={user} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/search" element={<Search />} />
          <Route path="/pay" element={<Pay />} />
          {/* Not logged in user */}
          <Route
            path="/login"
            element={
              <ProctedRoute isAuthanticated={user ? false : true}>
                <Login />
              </ProctedRoute>
            }
          />
          {/* Login routes */}
          <Route
            element={<ProctedRoute isAuthanticated={user ? true : false} />}
          >
            <Route path="/product/shipping" element={<Shipping />} />
            <Route path="/product/order" element={<Orders />} />
          </Route>
          {/* Admin Routes */}
          {user && (
            <Route
              element={
                <ProctedRoute
                  isAuthanticated={user ? true : false}
                  adminOnly={user?._id ? true : false}
                  admin={user?.role === "admin" ? true : false}
                />
              }
            >
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/product" element={<Products />} />
              <Route path="/admin/customer" element={<Customers />} />
              <Route path="/admin/transaction" element={<Transaction />} />
              {/* Charts */}
              <Route path="/admin/chart/bar" element={<Barcharts />} />
              <Route path="/admin/chart/pie" element={<Piecharts />} />
              <Route path="/admin/chart/line" element={<Linecharts />} />
              {/* Apps */}
              <Route path="/admin/app/coupon" element={<Coupon />} />
              <Route path="/admin/app/stopwatch" element={<Stopwatch />} />
              <Route path="/admin/app/toss" element={<Toss />} />

              {/* Management */}
              <Route path="/admin/product/new" element={<NewProduct />} />

              <Route
                path="/admin/product/:id"
                element={<ProductManagement />}
              />

              <Route
                path="/admin/transaction/:id"
                element={<TransactionManagement />}
              />
              <Route path="*" element={<PageNotFound />} />
            </Route>
          )}
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
