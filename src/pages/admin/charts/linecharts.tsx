import { useSelector } from "react-redux";
import AdminSidebar from "../../../components/admin/AdminSidebar";
import { LineChart } from "../../../components/admin/Charts";
import { userReducerInitialType } from "../../../types/user-reducer-type";
import { useLineQuery } from "../../../redux/Api/statApi";
import { CustomError } from "../../../types/productType";
import toast from "react-hot-toast";
import { Sketch } from "../../../components/loader";
import { latestMonth } from "../../../utils/responceData";

const Linecharts = () => {
  const { last12Month } = latestMonth();

  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { data, isLoading, error } = useLineQuery(user?._id!);
  const Line = data?.chart!;
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
          <h1>Line Charts</h1>
          <section>
            <LineChart
              data={Line?.userData}
              label="Users"
              borderColor="rgb(53, 162, 255)"
              labels={last12Month}
              backgroundColor="rgba(53, 162, 255, 0.5)"
            />
            <h2>Active Users</h2>
          </section>

          <section>
            <LineChart
              data={Line?.product}
              backgroundColor={"hsla(269,80%,40%,0.4)"}
              borderColor={"hsl(269,80%,40%)"}
              labels={last12Month}
              label="Products"
            />
            <h2>Total Products (SKU)</h2>
          </section>

          <section>
            <LineChart
              data={Line?.revenue}
              backgroundColor={"hsla(129,80%,40%,0.4)"}
              borderColor={"hsl(129,80%,40%)"}
              label="Revenue"
              labels={last12Month}
            />
            <h2>Total Revenue </h2>
          </section>

          <section>
            <LineChart
              data={Line?.discount}
              backgroundColor={"hsla(29,80%,40%,0.4)"}
              borderColor={"hsl(29,80%,40%)"}
              label="Discount"
              labels={last12Month}
            />
            <h2>Discount Allotted </h2>
          </section>
        </main>
      )}
    </div>
  );
};

export default Linecharts;
