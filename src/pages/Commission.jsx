import ProductTable from "../components/products/ProductTable";
import { getCommissions } from "../api/commissionsApi";
import { useState, useEffect } from "react";
import Loader from "../components/loader/Loader";

// Function to format a date as "DD/MM/YYYY HH:MM"
function formatDate(dateString) {
  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString(undefined, options);
}

const Commission = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsData = await getCommissions();
        if (!productsData) {
          setIsLoading(false);
          return;
        }

        // Format the date property for each item
        const formattedProducts = productsData.map(({ date, ...rest }) => ({
          ...rest,
          date: formatDate(date),
        }));

        setProducts(formattedProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <main>
      <div className="breadCrumbs">Provize</div>
      {isLoading ? (
        <Loader />
      ) : (
        <ProductTable
          noProductMessage="Zatím nemáte žádné provize"
          data={products}
          fields={["date", "name", "status.name", "commission"]}
          fieldNames={{
            date: "Datum",
            name: "Název",
            "status.name": "Stav",
            commission: "Provize",
          }}
          customRender={{
            "status.name": (item) => <span>{item.status.name}</span>,
          }}
        />
      )}
    </main>
  );
};

export default Commission;
