import image from "../assets/images/cover.jpeg";
import ProductCard from "../components/productCard";
import { useLatestProductQuery } from "../redux/Api/product";
import toast from "react-hot-toast";
import Loader, { Sketch } from "../components/loader";

export const Home = () => {
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
        <Sketch />
        <div className="card">
          {isLoading ? (
            <Loader />
          ) : (
            data?.products.map((i) => (
              <ProductCard
                name={i.name}
                key={i.name}
                price={i.price}
                stock={i.stock}
                productId={i._id}
                addToCartHandler={() => {}}
                photo={`${import.meta.env.VITE_BASE_URL}/${i.photo}`}
              />
            ))
          )}
        </div>
      </section>
    </div>
  );
};
