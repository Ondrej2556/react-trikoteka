import { useSearchParams } from "react-router-dom"
import products from "../../sample-data/products"
import ProductForm from "../../components/products/ProductForm"

const EditProduct = () => {
    const [queryParams] = useSearchParams()
    const productID = queryParams.get("productId")

    const product = products.find((product) => product.id === Number(productID))

  return (
    <div>
        <div className="breadCrumbs">Editace produktu: {product.title}</div>
        <ProductForm type="Upravit" product={product}/>
    </div>
  )
}

export default EditProduct