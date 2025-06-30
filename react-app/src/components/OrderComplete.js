import React from 'react';
import Header from './Header';
import Footer from './Footer';
import './OrderComplete.css'; // Import OrderComplete styles

const OrderComplete = () => {
  return (
    <div>
      <Header /> {/* Include the Header component */}
      <div className="order-complete-container">
        <div className="order-success-box">
          <h2>Order Complete</h2>
          <p>Your payment was successful. Thank you for your order!</p>
        </div>
      </div>
      <Footer /> {/* Include the Footer component */}
    </div>
  );
};

export default OrderComplete;
