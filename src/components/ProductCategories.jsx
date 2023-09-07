import { getAllCategories } from "../api/productApi";
import { useEffect, useState } from "react";

const ProductCategories = ({ categoryId }) => {
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const categories = await getAllCategories();
        if (!categories) {
          setIsLoading(false); // Set loading to false if there are no products
          return;
        }
        const foundCategory = categories.find((color) => color.id === categoryId);
        setCategory(foundCategory);

        setIsLoading(false); // Set loading to false once the product is fetched
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); // Set loading to false in case of an error
      }
    };

    fetchCategory();
  }, [categoryId]); // Include productID in the dependency array
  return (
    <>
    {isLoading ? (
        <p>Loading categories..</p>
     ) : category ? (
        <div key={category.id}>
        {category.name}
      </div>
    ) : (
        <p>No categories found..</p>
    )}
    </>
    
  );
};

export default ProductCategories;
