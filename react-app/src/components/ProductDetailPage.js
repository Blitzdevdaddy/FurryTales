import React, { useState } from "react";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Productdata from "../db/Productdata";
import { AiFillStar } from "react-icons/ai";
import Header from "./Header";

const ProductDetailPage = () => {
  const { productId } = useParams();
const product = Productdata.find((item) => item.id === productId);

  const [loading, setLoading] = useState(false);

  const addToCart = async () => {
    setLoading(true);
    try {


      const token = localStorage.getItem('token'); // Assuming you store the JWT token in localStorage upon login
      await axios.post(`http://localhost:4000/add-to-cart/${productId}`, null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      alert('Product added to cart successfully!');
    } catch (error) {
      console.error('Error adding product to cart:', error);
      alert('Failed to add product to cart');
    } finally {
      setLoading(false);
    }
  };

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Header />
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80vh", padding: "20px" }}>
        <div style={{ display: "flex", flex: 1, justifyContent: "center", width: "50%" }}>
          <img src={product.img} alt={product.title} style={{ width: "40%", height: "auto", border: "1px solid #ddd", borderRadius: "5px", boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)" }} />
        </div>
        <div style={{ display: "flex", flex: 1, flexDirection: "column", alignItems: "flex-start", marginLeft: "40px" }}>
          <h1 style={{ fontSize: "36px", fontWeight: "bold", marginBottom: "20px" }}>{product.title}</h1>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            {product.star}
            <span style={{ marginLeft: "10px", fontSize: "24px" }}>{product.reviews}</span>
          </div>
          <p style={{ fontSize: "28px", marginBottom: "20px" }}>Price: {product.newPrice}</p>
          <p style={{ fontSize: "28px", marginBottom: "20px" }}>Company: {product.company}</p>
          {/* Add more details here */}
          <button style={{ padding: "15px 30px", fontSize: "24px", backgroundColor: "#f0c14b", border: "1px solid #a88734", borderRadius: "5px", cursor: "pointer", marginBottom: "20px" }} onClick={addToCart} disabled={loading}>{loading ? 'Adding to Cart...' : 'Add to Cart'}</button>
          <div style={{ border: "1px solid #ddd", borderRadius: "5px", padding: "20px" }}>
            <h2 style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>Product Description</h2>
            <p style={{ fontSize: "20px" }}>{product.Description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;
