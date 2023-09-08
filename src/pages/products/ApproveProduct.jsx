import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/loader/Loader";
import ProductTable from "../../components/products/ProductTable";
import { getAllProducts } from "../../api/productApi";

const ApproveProduct = ({ isAdmin }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        if (!products) {
          setIsLoading(false);
          return;
        }
        setProducts(products);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [isAdmin]);

  const productsToDisplay = products.filter(
    // ZDE LOGIC PRO WAITING PRODUKTY
    (product) => product.uuid === "uuid123"
  );

  return (
    <main>
      <div className="breadCrumbs">Produkty na schválení</div>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductTable
          noProductMessage="Žádné produkty pro schválení"
          data={productsToDisplay}
          fields={["mediaId", "title", "state", "uuid", "action"]}
          fieldNames={{
            mediaId: "Obrázek",
            title: "Jméno",
            state: "Stav",
            uuid: "Autor",
            action: "Akce",
          }}
          customRender={{
            action: (item) => (
              <div>
                <button
                  onClick={() =>
                    navigate(`/product/detail?productId=${item.id}`)
                  }
                >
                  Detail
                </button>
              </div>
            ),
          }}
        />
      )}
    </main>
  );
};

export default ApproveProduct;
