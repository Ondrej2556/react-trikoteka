import React from 'react'
import ProductForm from '../../components/products/ProductForm'

const CreateProduct = () => {
  return (
    <div>
        <div className="breadCrumbs">Vytvořit Nový Produkt</div>
        <ProductForm type="Vytvořit" />
    </div>
  )
}

export default CreateProduct