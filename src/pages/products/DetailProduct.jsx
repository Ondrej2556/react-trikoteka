import { useSearchParams } from "react-router-dom";
import products from "../../sample-data/products";

const DetailProduct = ({isAdmin}) => {
  const [queryParams] = useSearchParams();
  const productID = queryParams.get("productId");


  const product = products.find((product) => product.id === Number(productID));

  const approveProduct = () => {
    //Approve logic here
    console.log("Approve product", product.title);
  };

  const refuseProduct = () => {
    //Refuse logic here

    const reason = prompt("Důvod zamítnutí? ");
    console.log("Refuse product", product.title, "Reason: ", reason);
  };

  return (
    <main>
      <div className="breadCrumbs">Detail produktu: {product.title}</div>
      <div className="container">
        {/* <!-- Left Column / Headphones Image --> */}
        <div className="left-column">
          <img src={product.imageUrl} alt={product.title} width="80%" />
        </div>

        {/* <!-- Right Column --> */}
        <div className="right-column">
          {/* <!-- Product Description --> */}
          <div className="product-description">
            {isAdmin && <span>Autor: {product.author}</span>}
            <h1>{product.title}</h1>
            <p>{product.description}</p>
          </div>

          {/* <!-- Product Configuration --> */}
          <div className="product-configuration">
            {/* <!-- Product Color --> */}
            <div className="product-color">
              <span>Color</span>
              <br />
              {product.color.map((color, i) => (
                <span key={i}>{color}, </span>
              ))}
            </div>
          </div>
          <br />

          {/* <!-- Cable Configuration --> */}
          <div className="cable-config">
            <span>Keywords</span>

            <div className="cable-choose">
              {product.keywords.map((keyword, i) => (
                <button key={i}>{keyword}</button>
              ))}
            </div>
            <br />
            <span>Categories</span>
            <div className="cable-choose">
              {product.categories.map((category, i) => (
                <button key={i}>{category}</button>
              ))}
            </div>
          </div>
          <h2>
            Stav:{" "}
            <span
              className={`state ${product.state} === 'approved' ? "approved" : "waiting"`}
            >
              {product.state}
            </span>
          </h2>
          <br />
          {isAdmin && (
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                style={{ padding: "15px", backgroundColor: "green" }}
                onClick={approveProduct}
              >
                Schválit
              </button>
              <button
                style={{ padding: "15px", backgroundColor: "red" }}
                onClick={refuseProduct}
              >
                Zamítnout
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default DetailProduct;
