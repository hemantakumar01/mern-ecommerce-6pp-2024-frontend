import { useState } from "react";
import ProductCard from "../components/productCard";
import "../styles/search.scss";
import {
  useAllCategoriesQuery,
  useSearchProductQuery,
} from "../redux/Api/product";
import { CustomError } from "../types/productType";
import toast from "react-hot-toast";
import { Sketch } from "../components/loader";

const Search = () => {
  const [sort, setSort] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [page, setPage] = useState(1);

  // Search QUeruy
  const {
    data: productData,
    isLoading: productLoading,
    error: productError,
  } = useSearchProductQuery({
    search,
    category,
    maxPrice,
    page,
    sort,
  });

  const {
    data: categoryData,
    isLoading: categoryLoading,
    error,
  } = useAllCategoriesQuery("");

  if (error) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  const isPrevios = page > 1;
  const isNext = page < productData?.totalPage!;
  return (
    <div className="search">
      <aside>
        <div className="">
          <label htmlFor="">Sort</label>
          <select
            name=""
            id=""
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">All</option>
            <option value="src">Price (Low to high)</option>
            <option value="">Price (high to low)</option>
          </select>
        </div>
        <div className="">
          <label htmlFor="">Max Price: {maxPrice}</label>
          <input
            type="range"
            value={maxPrice}
            min={10}
            max={100000}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </div>
        <div className="">
          <label htmlFor="">Category</label>
          <select
            name=""
            id=""
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">All</option>
            {categoryLoading === false &&
              categoryData?.categories.map((i) => (
                <option key={i} value={i}>
                  {i.toUpperCase()}
                </option>
              ))}
          </select>
        </div>
      </aside>
      <main>
        <h1>Products</h1>
        <input
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
          }}
        />
        <div className="search-result">
          {productLoading ? (
            <Sketch />
          ) : (
            productData?.product.map((i) => {
              return (
                <ProductCard
                  name={i.name}
                  price={i.price}
                  stock={i.stock}
                  productId={i._id}
                  photo={`${import.meta.env.VITE_BASE_URL}/${i.photo}`}
                  key={i._id}
                />
              );
            })
          )}
        </div>
        {productData && productData?.totalPage > 1 && (
          <article>
            <button
              disabled={!isPrevios}
              onClick={() => setPage((prev) => (page > 1 ? prev - 1 : page))}
            >
              Prev
            </button>
            <span>
              {page} Page 0f {productData?.totalPage}
            </span>
            <button
              disabled={!isNext}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </button>
          </article>
        )}
      </main>
    </div>
  );
};

export default Search;
