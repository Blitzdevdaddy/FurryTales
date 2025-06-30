import React from 'react'
import ProductCard from "../components/ProductCard"
import "./ProductsMain.css"

function ProductsMain({result}) {
  return (
    <section className="card-container">
       {result}
    </section>
  )
}

export default ProductsMain
