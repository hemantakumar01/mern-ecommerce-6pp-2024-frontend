const Loader = () => {
  return (
    <section className="loader">
      <div></div>
    </section>
  );
};

export default Loader;

export const Sketch = ({
  height,
  width,
  length = 5,
}: {
  height?: string;
  width?: string;
  length?: number;
}) => {
  const skel = Array.from({ length }, (_, o) => (
    <div
      key={o}
      className="skeleton-items"
      style={{ width, height, flexDirection: "column" }}
    ></div>
  ));
  return <div className="skeloton">{skel}</div>;
};
