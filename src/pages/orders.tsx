import { ReactElement, useEffect, useState } from "react";
import TableHOC from "../components/admin/TableHOC";
import { Column } from "react-table";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { userReducerInitialType } from "../types/user-reducer-type";
import { useGetAllOrderQuery } from "../redux/Api/orderApi";
import { CustomError } from "../types/productType";
import toast from "react-hot-toast";
import { Sketch } from "../components/loader";
import { RootState } from "../redux/store";

type DataType = {
  _id: string;
  amount: number;
  quantity: number;
  discount: number;
  status: ReactElement;
  action: ReactElement;
};
const column: Column<DataType>[] = [
  {
    Header: "ID",
    accessor: "_id",
  },
  {
    Header: "Quantity",
    accessor: "quantity",
  },
  {
    Header: "Discount",
    accessor: "discount",
  },
  {
    Header: "Amount",
    accessor: "amount",
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
const Orders = () => {
  const [rows, setRows] = useState<DataType[]>([
    {
      _id: "jmgbnfgnbvgf",
      amount: 1234,
      quantity: 12,
      discount: 123,
      status: <span style={{ color: "tomato" }}>Status</span>,
      action: <Link to={`/order/jmgbnfgnbvgf`}>Action</Link>,
    },
  ]);

  const { user } = useSelector((state: RootState) => state.userReducer);

  const { isLoading, data, error } = useGetAllOrderQuery(user?._id!);
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data) {
      setRows(
        data.orders.map((i) => ({
          _id: i._id,
          amount: i.total,
          quantity: i.orderItem.length,
          discount: i.discount,
          status: (
            <span
              style={{
                color: `${
                  i.status === "Processing"
                    ? "tomato"
                    : i.status === "Shipped"
                    ? "purple"
                    : "green"
                }`,
              }}
            >
              {i.status}
            </span>
          ),
          action: <Link to={`/order/${i._id}`}>Action</Link>,
        }))
      );
    }
  }, [data]);

  const Table = TableHOC<DataType>(
    column,
    rows,
    "dashboard-product-box",
    "Ordres",
    rows.length > 6
  )();
  return (
    <div className="container">
      <h1>My Ordres</h1>
      {isLoading ? <Sketch /> : Table}
    </div>
  );
};

export default Orders;
