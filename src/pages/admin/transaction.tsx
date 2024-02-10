import { ReactElement, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { useSelector } from "react-redux";
import { userReducerInitialType } from "../../types/user-reducer-type";
import { useGetAllOrderQuery } from "../../redux/Api/orderApi";
import { CustomError } from "../../types/productType";
import toast from "react-hot-toast";
import { Sketch } from "../../components/loader";

interface DataType {
  user: string;
  amount: number;
  discount: number;
  quantity: number;
  status: ReactElement;
  action: ReactElement;
}

const arr: Array<DataType> = [
  {
    user: "Charas",
    amount: 4500,
    discount: 400,
    status: <span className="red">Processing</span>,
    quantity: 3,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },

  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="green">Shipped</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
  {
    user: "Xavirors",
    amount: 6999,
    discount: 400,
    status: <span className="purple">Delivered</span>,
    quantity: 6,
    action: <Link to="/admin/transaction/sajknaskd">Manage</Link>,
  },
];

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "user",
  },
  {
    Header: "Amount",
    accessor: "amount",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Status",
    accessor: "status",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Transaction = () => {
  const [rows, setRows] = useState<DataType[]>(arr);
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { isLoading, data, error } = useGetAllOrderQuery(user?._id!);
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }
  useEffect(() => {
    if (data) {
      setRows(
        data?.orders?.map((i) => ({
          user: i.user,
          amount: i.total,
          discount: i.discount,
          status: (
            <span
              style={{
                color:
                  i.status === "Processing"
                    ? "red"
                    : i.status === "Shipped"
                    ? "purple"
                    : "green",
              }}
              className="red"
            >
              {i.status}
            </span>
          ),
          quantity: i.orderItem.length,
          action: <Link to={`/admin/transaction/${i._id}`}>Manage</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Transactions",
    rows.length > 6
  )();
  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Sketch /> : Table}</main>
    </div>
  );
};

export default Transaction;
