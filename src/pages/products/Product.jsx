import { Link, useNavigate } from "react-router-dom";
import ProductTable from "../../components/products/ProductTable";
import { deleteProductById, getAllProducts } from "../../api/productApi";
import { useEffect, useState } from "react";
import Loader from '../../components/loader/Loader'

const Product = () => {
  const [products, setProducts ] = useState([])
  const [isLoading, setIsLoading ] = useState(true)
  const navigate = useNavigate()
  const handleDelete = async (id) => {
    console.log("delete", id);
    if (confirm("Opravdu chcete smazat?")) {
      console.log("smazano");
      await deleteProductById(id)
    }
  };
  useEffect(() => {
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
  }, []);

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
        {isLoading ? (
          <Loader />
         ) : ( 
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
                <button onClick={() => navigate(`/product/edit?productId=${item.uuid}`)}>Edit</button>
                <button onClick={() => handleDelete(item.uuid)}>Delete</button>
              </div>
            ),
          }}
        />
        )}
        
      </div>
    </div>
  );
};

export default Product;
