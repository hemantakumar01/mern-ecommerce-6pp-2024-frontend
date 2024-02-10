import { ReactElement, useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useAllProductQuery } from "../../redux/Api/product";
import toast from "react-hot-toast";
import { CustomError } from "../../types/productType";
import { useSelector } from "react-redux";
import { userReducerInitialType } from "../../types/user-reducer-type";
import { Sketch } from "../../components/loader";

interface DataType {
  photo: ReactElement;
  name: string;
  price: number;
  stock: number;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Photo",
    accessor: "photo",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Price",
    accessor: "price",
  },
  {
    Header: "Stock",
    accessor: "stock",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Products = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { data, isLoading, error } = useAllProductQuery(user?._id!);
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRows(
        data?.products?.map((i) => ({
          photo: <img src={`${import.meta.env.VITE_BASE_URL}/${i.photo}`} />,
          name: i.name!,
          price: i.price!,
          stock: i.stock!,
          action: <Link to={`/admin/product/${i._id}`}>Update</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Products",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? <Sketch /> : <main>{Table}</main>}
      <Link to="/admin/product/new" className="create-product-btn">
        <FaPlus />
      </Link>
    </div>
  );
};

export default Products;
