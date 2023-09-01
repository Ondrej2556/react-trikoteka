import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductTable from "../../components/products/ProductTable";
import products from "../../sample-data/products";

const ApproveProduct = ({ isAdmin }) => {
  const navigate = useNavigate();
  useEffect(() => {
    if (!isAdmin) {
      navigate("/");
    }
  }, [isAdmin]);

  const productsToDisplay = products.filter(
    (product) => product.state === "waiting"
  );


  return (
    <main>
      <div className="breadCrumbs">Produkty na schválení</div>

      <ProductTable
        noProductMessage="Žádné produkty pro schválení"
        data={productsToDisplay}
        fields={["imageUrl", "title", "state", "author", "action"]}
        fieldNames={{
          imageUrl: "Obrázek",
          title: "Jméno",
          state: "Stav",
          author: "Autor",
          action: "Akce"
        }}
        customRender={{
          action: (item) => (
            <div>
              <button onClick={() => navigate(`/product/detail?productId=${item.id}`)}>Detail</button>
            </div>
          ),
        }}
      />
    </main>
  );
};

export default ApproveProduct;
