import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductForm from "../../components/products/ProductForm";
import { getProductById } from "../../api/productApi";
import Loader from "../../components/loader/Loader";

const EditProduct = () => {
  const [queryParams] = useSearchParams();
  const productId = queryParams.get("productId");
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const product = await getProductById(productId);
        if (!product) {
          setIsLoading(false);
          return;
        }
        setProduct(product);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);


  return (
    <div>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="breadCrumbs">Editace produktu: {product.title}</div>
          <ProductForm type="Upravit" product={product}/>
        </>
      )}
    </div>
  );
};

export default EditProduct;
