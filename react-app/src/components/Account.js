import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "./Header";
import axios from "axios";

function Account() {
  const [email, setEmail] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [showAddAddress, setShowAddAddress] = useState(false); // State to toggle address form visibility
  const [addresses, setAddresses] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/get-user', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setEmail(res.data.email);
      // Fetch addresses
      fetchAddresses();
    })
    .catch((error) => {
      console.error(error);
    });
  }, []);

  const fetchAddresses = () => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:4000/get-addresses', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      setAddresses(res.data.addresses);
    })
    .catch((error) => {
      console.error(error);
    });
  };

  const handleAddressSubmit = () => {
    const token = localStorage.getItem('token');
    axios.post('http://localhost:4000/add-address', { street, city, country }, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    .then((res) => {
      console.log(res.data);
      // Handle success if needed
      alert('Address added successfully');
      // Fetch addresses again after adding a new address
      fetchAddresses();
    })
    .catch((error) => {
      console.error(error);
      alert('Failed to add address');
    });
  };

  return (
    <div>
      <Header />
      <div style={containerStyle}>
        <div style={{ ...accountBoxStyle, backgroundColor: '#ffffff', color: '#34495E', width: '100%' }}>
          <h1 style={headingStyle}>My Account</h1>
        </div>
        <div style={emailBoxStyle}>
          <p style={emailHeadingStyle}>Email</p>
          <p style={emailContentStyle}>{email}</p>
        </div>
        <div style={addressContainerStyle}>
          <div style={{ ...addressBoxStyle, color: '#34495E' }}>
            <h2>My Addresses</h2>
            <ul>
              {addresses.map((address, index) => (
                <li key={index}>Address {index + 1}: {address.street}, {address.city}, {address.country}</li>
              ))}
            </ul>
            <button style={{ backgroundColor: '#34495E', color: 'white' }} onClick={() => setShowAddAddress(!showAddAddress)}>Add New Address</button>
            {showAddAddress && (
              <div>
                <h3>Add New Address</h3>
                <form onSubmit={(e) => { e.preventDefault(); handleAddressSubmit(); }}>
                  <label>
                    Street:
                    <input type="text" value={street} onChange={(e) => setStreet(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    City:
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
                  </label>
                  <br />
                  <label>
                    Country:
                    <input type="text" value={country} onChange={(e) => setCountry(e.target.value)} />
                  </label>
                  <br />
                  <button type="submit">Add Address</button>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={buttonContainerStyle}>
        <Link to="/cart" style={{ ...buttonStyle, backgroundColor: '#34495E' }}>Go to Cart</Link>
      </div>
    </div>
  );
}

const containerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  paddingTop: '50px',
};

const accountBoxStyle = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px'
};

const emailBoxStyle = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px'
};

const emailHeadingStyle = {
  fontWeight: 'bold'
};

const emailContentStyle = {
  marginBottom: '0'
};

const buttonContainerStyle = {
  textAlign: 'center'
};

const buttonStyle = {
  backgroundColor: '#34495E',
  color: 'white',
  padding: '10px 20px',
  borderRadius: '5px',
  textDecoration: 'none'
};

const headingStyle = {
  marginTop: '0',
};

const addressContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
};

const addressBoxStyle = {
  boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)',
  backgroundColor: '#ffffff',
  padding: '20px',
  textAlign: 'center',
  marginBottom: '20px'
};

export default Account;
