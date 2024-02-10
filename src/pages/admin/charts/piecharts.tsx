import AdminSidebar from "../../../components/admin/AdminSidebar";
import { DoughnutChart, PieChart } from "../../../components/admin/Charts";
import { useSelector } from "react-redux";
import { userReducerInitialType } from "../../../types/user-reducer-type";
import { usePieQuery } from "../../../redux/Api/statApi";
import { CustomError } from "../../../types/productType";
import toast from "react-hot-toast";
import { Sketch } from "../../../components/loader";

const PieCharts = () => {
  const { user } = useSelector(
    (state: { userReducer: userReducerInitialType }) => state.userReducer
  );

  const { data: data2, isLoading, error } = usePieQuery(user?._id!);
  const Pie = data2?.chart!;

  if (error) {
    const err = error as CustomError;

    toast.error(err.data.message);
  }
  const burnt = Pie?.revinewStats.burnt;
  const discount = Pie?.revinewStats.discount;
  const marketingCost = Pie?.revinewStats.marketingCost;
  const netMargin = Pie?.revinewStats.netMargin;
  const productionCost = Pie?.revinewStats.productionCost;
  // userAgeType
  const teen = Pie?.userAgeType.teen;
  const adult = Pie?.userAgeType.adult;
  const old = Pie?.userAgeType.old;

  const admin = Pie?.allUsers.admin;
  const users = Pie?.allUsers.users;
  return (
    <div className="admin-container">
      <AdminSidebar />
      {isLoading && data2 ? (
        <Sketch />
      ) : (
        <main className="chart-container">
          <h1>Pie & Doughnut Charts</h1>
          <section>
            <div>
              <PieChart
                labels={["Processing", "Shipped", "Delivered"]}
                data={[
                  Pie?.status.process,
                  Pie?.status.shipped,
                  Pie?.status.delevered,
                ]}
                backgroundColor={[
                  `hsl(110,80%, 80%)`,
                  `hsl(110,80%, 50%)`,
                  `hsl(110,40%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Order Fulfillment Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={Pie?.status?.categories.map((i) => {
                  const [key] = Object.entries(i)[0];
                  return key;
                })}
                data={Pie?.status?.categories.map((i) => {
                  const [_, value] = Object.entries(i)[0];
                  return value;
                })}
                backgroundColor={Pie?.status?.categories.map((i) => {
                  const [_, value] = Object.entries(i)[0];

                  return `hsl(${value * Math.random() * 4}, ${value}%, 50%)`;
                })}
                legends={false}
                offset={[0, 0, 0, 80]}
              />
            </div>
            <h2>Product Categories Ratio</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["In Stock", "Out Of Stock"]}
                data={[Pie?.stock.inStock, Pie?.stock.outOfStock]}
                backgroundColor={["hsl(269,80%,40%)", "rgb(53, 162, 255)"]}
                legends={false}
                offset={[0, 80]}
                cutout={"70%"}
              />
            </div>
            <h2> Stock Availability</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={[
                  "Marketing Cost",
                  "Discount",
                  "Burnt",
                  "Production Cost",
                  "Net Margin",
                ]}
                data={[
                  marketingCost,
                  discount,
                  burnt,
                  productionCost,
                  netMargin,
                ]}
                backgroundColor={[
                  "hsl(110,80%,40%)",
                  "hsl(19,80%,40%)",
                  "hsl(69,80%,40%)",
                  "hsl(300,80%,40%)",
                  "rgb(53, 162, 255)",
                ]}
                legends={false}
                offset={[20, 30, 20, 30, 80]}
              />
            </div>
            <h2>Revenue Distribution</h2>
          </section>

          <section>
            <div>
              <PieChart
                labels={[
                  "Teenager(Below 20)",
                  "Adult (20-40)",
                  "Older (above 40)",
                ]}
                data={[teen, adult, old]}
                backgroundColor={[
                  `hsl(10, ${80}%, 80%)`,
                  `hsl(10, ${80}%, 50%)`,
                  `hsl(10, ${40}%, 50%)`,
                ]}
                offset={[0, 0, 50]}
              />
            </div>
            <h2>Users Age Group</h2>
          </section>

          <section>
            <div>
              <DoughnutChart
                labels={["Admin", "Customers"]}
                data={[admin, users]}
                backgroundColor={[`hsl(335, 100%, 38%)`, "hsl(44, 98%, 50%)"]}
                offset={[0, 50]}
              />
            </div>
          </section>
        </main>
      )}
    </div>
  );
};

export default PieCharts;
