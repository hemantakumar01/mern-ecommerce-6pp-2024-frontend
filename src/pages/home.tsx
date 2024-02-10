import "../styles/home.scss";
import image from "../assets/images/cover.jpeg";
import ProductCard from "../components/productCard";
import { useLatestProductQuery } from "../redux/Api/product";
import toast from "react-hot-toast";
import { Sketch } from "../components/loader";
const Home = () => {
  const { data, isError, isLoading } = useLatestProductQuery("");
  if (isError) toast.error("Product not found");
  return (
    <div className="home">
      <div
        className="section"
        style={{
          width: "100%",
          height: "20.5rem",
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
        }}
      ></div>
      <button className="readMore">Read More</button>
      <section>
        <h3>Featured Products</h3>
        <div className="card">
          {isLoading ? (
            <Sketch width="100px" height="200px" />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                name={i.name}
                key={i.name}
                price={i.price}
                stock={i.stock}
                productId={i._id}
                handler={() => {}}
                photo={`${import.meta.env.VITE_BASE_URL}/${i.photo}`}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default Home;
