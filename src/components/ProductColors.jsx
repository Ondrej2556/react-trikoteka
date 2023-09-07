import { getAllColors } from "../api/productApi";
import { useEffect, useState } from "react";

const ProductColors = ({ colorId }) => {
  const [color, setColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchColor = async () => {
      try {
        const colors = await getAllColors();
        if (!colors) {
          setIsLoading(false); 
          return;
        }
        const foundColors = colors.find((color) => color.id === colorId);
        setColor(foundColors);

        setIsLoading(false); 
      } catch (error) {
        console.error("Error fetching products:", error);
        setIsLoading(false); 
      }
    };

    fetchColor();
  }, [colorId]);
  return (
    <>
    {isLoading ? (
        <p>Loading colors..</p>
     ) : color ? (
        <div key={color.id}>
        <div
          style={{
            backgroundColor: color.hex, // Use the color's hex code for background color
            width: "20px",
            height: "20px",
            display: "inline-block",
            marginRight: "5px",
          }}
        ></div>
        {color.name}
      </div>
    ) : (
        <p>No colors found..</p>
    )}
    </>
    
  );
};

export default ProductColors;
