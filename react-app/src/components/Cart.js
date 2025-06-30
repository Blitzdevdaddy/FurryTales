import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { Link } from 'react-router-dom';
import Productdata from '../db/Productdata'; // Import the product data
import './Cart.css'; // Import Cart component styles

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/get-cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const cartIds = res.data.cart;
      const updatedCartItems = cartIds.reduce((acc, cartId) => {
        const productId = cartId.toString();
        const existingItemIndex = acc.findIndex(item => item.id === productId);
        if (existingItemIndex !== -1) {
          // Item already exists in the cart, update quantity
          acc[existingItemIndex].quantity += 1;
        } else {
          // Item doesn't exist in the cart, add it
          const product = Productdata.find(product => product.id === productId);
          if (product) {
            acc.push({
              ...product,
              quantity: 1
            });
          } else {
            console.error(`Product with ID ${productId} not found in Productdata`);
          }
        }
        return acc;
      }, []);
      setCartItems(updatedCartItems);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleEmptyCart = () => {
    const token = localStorage.getItem('token');
    axios.delete('http://localhost:4000/empty-cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      // Clear the cart items state
      setCartItems([]);
      console.log('Cart emptied successfully');
    })
    .catch((error) => {
      console.error('Error emptying cart:', error);
    });
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + (parseFloat(item.newPrice) * item.quantity), 0);
  };

  return (
    <div>
      <Header title="Your Cart" />
      <div className="cart">
        <div className="cart-items">
          {cartItems.length === 0 ? (
            <p style={{ fontSize: '24px', textAlign: 'center', marginTop: '100px' }}>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  <div className="cart-item">
                    <img src={item.img} alt={item.title} />
                    <div className="item-details">
                      <h3>{item.title}</h3>
                      <p>Rs.{item.newPrice}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="cart-footer">
          {cartItems.length > 0 && (
            <div className="total">
              <h3>Total: Rs.{calculateTotalPrice().toFixed(2)}</h3>
            </div>
          )}
          <div className="buttons">
            {cartItems.length > 0 && (
              <button onClick={handleEmptyCart} className="btn btn-danger">
                Empty Cart
              </button>
            )}
            {/* Proceed to Checkout button */}
            {cartItems.length > 0 && (
              <Link to={{ pathname: "/Payment", state: { totalAmount: calculateTotalPrice() } }} className="btn btn-primary checkout-btn">
                Proceed to Checkout
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
