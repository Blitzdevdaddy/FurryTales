import React, { useReducer } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductDetailPage from './ProductDetailPage';
import ProductCard from './ProductCard';
import Adopt from "./components/Adopt";
import Product from "./components/Product";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import Cart from "./components/Cart"; // Import Cart component

// Define initial state for the cart
const initialCartState = [];

// Reducer function to manage cart state
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return [...state, action.payload];
    default:
      return state;
  }
}

function App() {
  // Initialize cart state using useReducer hook
  const [cartState, dispatch] = useReducer(cartReducer, initialCartState);

  // Function to add item to cart
  function addToCart(item) {
    dispatch({ type: "ADD_TO_CART", payload: item });
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/about" element={<AboutUs />} />
          <Route exact path="/contact" element={<ContactUs />} />
          <Route exact path="/adopt" element={<Adopt />} />
          <Route exact path="/product" element={<Product addToCart={addToCart} />} />
          <Route exact path="/cart" element={<Cart cart={cartState} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
