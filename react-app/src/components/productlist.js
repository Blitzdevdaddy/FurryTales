import React from 'react';
import { Link } from 'react-router-dom';
import ProductData from '../db/Productdata'; // Import product data

function ProductList() {
  return (
    <div>
      {/* Map through the array of products and render a link for each product */}
      {ProductData.map(product => (
        <div key={product.id}> {/* Assuming product id is available */}
          <h3>{product.title}</h3>
          <img src={product.img} alt={product.title} />
          <p>Category: {product.category}</p>
          <p>Company: {product.company}</p>
          <p>New Price: {product.newPrice}</p>
          {/* Generate a link to the product detail page for each product */}
          <Link to={`/product/${product.id}`}>View Details</Link> {/* Use product id in the link */}
        </div>
      ))}
    </div>
  );
}

export default ProductList;
