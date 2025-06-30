import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Productdata from '../db/Productdata';
import './Payment.css';

const Payment = () => {
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');
  const [token, setToken] = useState('');
  const [totalAmount, setTotalAmount] = useState(0);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [cardSaved, setCardSaved] = useState(false); // Track if card details are saved

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    fetchCart();
  }, []);

  useEffect(() => {
    setIsButtonDisabled(!(cardNumber && cardHolder && expiryDate && cvv));
  }, [cardNumber, cardHolder, expiryDate, cvv]);

  useEffect(() => {
    // When cardSaved state changes and becomes true,
    // trigger the logic to move cart items to orders
    if (cardSaved) {
      moveCartItemsToOrders();
    }
  }, [cardSaved]);

  const fetchCart = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/get-cart', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      const cartIds = res.data.cart;
      const total = calculateTotalPrice(cartIds);
      setTotalAmount(total);
    })
    .catch((error) => {
      console.error('Error fetching cart:', error);
    });
  };

  const calculateTotalPrice = (cartIds) => {
    let totalPrice = 0;
    cartIds.forEach(cartId => {
      const productId = cartId.toString();
      const product = Productdata.find(product => product.id === productId);
      if (product) {
        totalPrice += parseFloat(product.newPrice);
      } else {
        console.error(`Product with ID ${productId} not found in Productdata`);
      }
    });
    return totalPrice;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      console.log("Submitting data:", { cardNumber, cardHolder, expiryDate, cvv });
      await axios.post('http://localhost:4000/save-card-details', 
        { cardNumber, cardHolder, expiryDate, cvv }, 
        { headers: { Authorization: `Bearer ${token}` } }
      );
  
      setIsLoading(false);
      alert('Card details saved successfully');
      // Call moveCartItemsToOrders directly after saving card details
      moveCartItemsToOrders();
    } catch (error) {
      setIsLoading(false);
      console.error('Error saving card details:', error);
      alert('Error saving card details. Please try again.');
    }
  };
  
  const moveCartItemsToOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:4000/move-to-orders', null, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('Cart items moved to orders successfully');
      // Redirect to '/ordercomplete' after cart items are successfully moved
      window.location.href = '/ordercomplete';
    } catch (error) {
      console.error('Error moving cart items to orders:', error);
    }
  };
  

  

  return (
    <div className="payment-container">
      <Header />
      <div className="payment-content">
        <h2>Enter Card Details</h2>
        <form onSubmit={handleSubmit} className="payment-form">
          <div className="input-box">
            <label>Card Number:</label>
            <input type="text" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
          </div>
          <div className="input-box">
            <label>Card Holder:</label>
            <input type="text" value={cardHolder} onChange={(e) => setCardHolder(e.target.value)} />
          </div>
          <div className="input-box">
            <label>Expiry Date:</label>
            <input type="text" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} />
          </div>
          <div className="input-box">
            <label>CVV:</label>
            <input type="text" value={cvv} onChange={(e) => setCvv(e.target.value)} />
          </div>
          <div className="total-amount-box">
            <h3>Total Amount: Rs.{totalAmount.toFixed(2)}</h3>
          </div>
          <button type="submit" className={`btn btn-primary checkout-btn ${isButtonDisabled || isLoading ? 'disabled' : ''}`} disabled={isButtonDisabled || isLoading}>
            {isLoading ? 'Processing...' : 'Proceed to Pay'}
          </button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Payment;
