import { ReactElement, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Column } from "react-table";
import AdminSidebar from "../../components/admin/AdminSidebar";
import TableHOC from "../../components/admin/TableHOC";
import { Sketch } from "../../components/loader";
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from "../../redux/Api/userApi";
import { CustomError } from "../../types/productType";
import { userReducerInitialType } from "../../types/user-reducer-type";
import { responceData } from "../../utils/responceData";

interface DataType {
  avatar: ReactElement;
  name: string;
  email: string;
  gender: string;
  role: string;
  action: ReactElement;
}

const columns: Column<DataType>[] = [
  {
    Header: "Avatar",
    accessor: "avatar",
  },
  {
    Header: "Name",
    accessor: "name",
  },
  {
    Header: "Gender",
    accessor: "gender",
  },
  {
    Header: "Email",
    accessor: "email",
  },
  {
    Header: "Role",
    accessor: "role",
  },
  {
    Header: "Action",
    accessor: "action",
  },
];

const Customers = () => {
  const [rows, setRows] = useState<DataType[]>([]);
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );
  const [deleteUser] = useDeleteUserMutation();
  const deleteUserHandler = async (userId: string) => {
    const res = await deleteUser({ id: user?._id!, user: userId });
    responceData(res, null, "");
  };
  const { data, isLoading, error } = useGetAllUsersQuery(user?._id!);
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }

  useEffect(() => {
    if (data?.users) {
      setRows(
        data.users.map((i) => ({
          avatar: (
            <img
              style={{
                borderRadius: "50%",
              }}
              src={i.photo.toString()}
              alt={i.name}
            />
          ),
          name: i.name,
          email: i.email,
          gender: i.gender,
          role: i.role!,
          action: (
            <button onClick={() => deleteUserHandler(i._id)}>
              <FaTrash />
            </button>
          ),
        }))
      );
    }
  }, [data]);
  const Table = TableHOC<DataType>(
    columns,
    rows,
    "dashboard-product-box",
    "Customers",
    rows.length > 6
  )();

  return (
    <div className="admin-container">
      <AdminSidebar />
      <main>{isLoading ? <Sketch /> : Table}</main>
    </div>
  );
};

export default Customers;
