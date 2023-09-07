import { useSearchParams } from "react-router-dom";
import { getProductById } from "../../api/productApi";
import { useState, useEffect } from "react";
import Loader from "../../components/loader/Loader";
import ProductColors from "../../components/ProductColors";
import ProductCategories from "../../components/ProductCategories";

const DetailProduct = ({ isAdmin }) => {
  const [queryParams] = useSearchParams();
  const productID = queryParams.get("productId");
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchProduct = async () => {
    try {
      const fetchedProduct = await getProductById(productID);
      if (!fetchedProduct) {
        setIsLoading(false);
        return;
      }
      setProduct(fetchedProduct);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching product:", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [productID]);

  const handleAction = (action) => {
    if (action === "approve") {
      console.log("Approve product", product.title);
    } else if (action === "refuse") {
      const reason = prompt("Důvod zamítnutí?");
      if (reason) {
        console.log("Refuse product", product.title, "Reason:", reason);
      }
    }
  };

  return (
    <main>
      {isLoading ? (
        <Loader />
      ) : product ? (
        <>
          <div className="breadCrumbs">Detail produktu: {product.title}</div>
          <div className="container">
            {/* Left Column / Headphones Image */}
            <div className="left-column">
              <img src={product.mediaId} alt={product.title} width="80%" />
            </div>

            {/* Right Column */}
            <div className="right-column">
              {/* Product Description */}
              <div className="product-description">
                {isAdmin && <span>Autor: {product.title}</span>}
                <h1>{product.title}</h1>
                <div
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </div>

              {/* Product Configuration */}
              <div className="product-configuration">
                {/* Product Color */}
                <div className="product-color">
                  <span>Barvy:</span>
                  <br />
                  {product.colors.map((color, i) => (
                    <ProductColors key={i} colorId={color} />
                  ))}
                </div>
              </div>
              <br />

              {/* Cable Configuration */}
              <div className="cable-config">
                <span>Keywords:</span>
                <div className="cable-choose">
                  {product.keywords.map((keyword, i) => (
                    <button key={i}>{keyword}</button>
                  ))}
                </div>
                <br />
                <span>Kategorie: </span>
                <div className="cable-choose">
                  {product.categoryIds.map((category, i) => (
                    <ProductCategories key={i} categoryId={category} />
                  ))}
                </div>
              </div>
              <h2>
                Stav:{" "}
                <span
                  className={`state ${
                    product.state === "approved" ? "approved" : "waiting"
                  }`}
                >
                  {product.state}
                </span>
              </h2>
              <br />
              {isAdmin && (
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    style={{ padding: "15px", backgroundColor: "green" }}
                    onClick={() => handleAction("approve")}
                  >
                    Schválit
                  </button>
                  <button
                    style={{ padding: "15px", backgroundColor: "red" }}
                    onClick={() => handleAction("refuse")}
                  >
                    Zamítnout
                  </button>
                </div>
              )}
            </div>
          </div>
        </>
      ) : (
        <div>Loading</div>
      )}
    </main>
  );
};

export default DetailProduct;
