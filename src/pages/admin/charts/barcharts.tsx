import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { BarChart } from "../../../components/admin/Charts";
import { useBarQuery } from "../../../redux/Api/statApi";
import { CustomError } from "../../../types/productType";
import { userReducerInitialType } from "../../../types/user-reducer-type";
import { Sketch } from "../../../components/loader";
import { latestMonth } from "../../../utils/responceData";

const Barcharts = () => {
  const { last12Month } = latestMonth();
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { data, isLoading, error } = useBarQuery(user?._id!);
  const chart = data?.chart!;
  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading ? (
        <Sketch />
      ) : (
        <main className="chart-container">
          <h1>Bar Charts</h1>
          <section>
            <BarChart
              data_1={chart.products}
              data_2={chart.users}
              title_1="Products"
              title_2="Users"
              bgColor_1={`hsl(260, 50%, 30%)`}
              bgColor_2={`hsl(360, 90%, 90%)`}
            />
            <h2>Top Products & Top Customers</h2>
          </section>

          <section>
            <BarChart
              horizontal={true}
              data_1={chart.orders}
              data_2={[]}
              title_1="Orders"
              title_2=""
              bgColor_1={`hsl(180, 40%, 50%)`}
              bgColor_2=""
              labels={last12Month}
            />
            <h2>Orders throughout the year</h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Barcharts;
