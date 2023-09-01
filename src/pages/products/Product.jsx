import { Link, useNavigate } from "react-router-dom";
import ProductTable from "../../components/products/ProductTable";
import products from "../../sample-data/products";

const Product = () => {
  const navigate = useNavigate()
  const handleDelete = (id) => {
    console.log("delete", id);
    if (confirm("Opravdu chcete smazat?")) {
      console.log("smazano");
    }
  };
  const handleEdit = (id) => {
    
  };

  return (
    <div>
      <div className="breadCrumbs">Produkty</div>
      <Link
        to="/product/create"
        style={{
          textAlign: "center",
          width: "100%",
          display: "block",
          fontSize: "1.2rem",
        }}
      >
        Vytvořit nový produkt
      </Link>
      <br />
      <div>
        <ProductTable
          noProductMessage="Zatím nemáte žádné produkty"
          data={products}
          fields={["imageUrl", "title", "state", "action"]}
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
                <button onClick={() => navigate(`/product/edit?productId=${item.id}`)}>Edit</button>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </div>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Product;
