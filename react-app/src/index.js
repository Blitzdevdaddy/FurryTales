// index.js
import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  useRoutes
} from "react-router-dom";

import Login from "./components/Login";
import Signup from "./components/Signup";
import Adopt from "./components/Adopt";
import Product from "./components/Product";
import AddPet from "./components/AddPet";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ContactUs";
import PetDetail from "./components/PetDetail";
import Cart from "./components/Cart";
import ProductDetailPage from "./components/ProductDetailPage";
import Account from "./components/Account";
import Payment from "./components/Payment"; // Import PaymentPage component
import OrderComplete from "./components/OrderComplete"; // Import OrderComplete component

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

// Function to add item to cart
function addToCart(dispatch, item) {
  dispatch({ type: "ADD_TO_CART", payload: item });
}

// Create BrowserRouter instance with routes
const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/login", element: <Login /> },
  { path: "/about", element: <AboutUs /> },
  { path: "/contact", element: <ContactUs /> },
  { path: "/signup", element: <Signup /> },
  { path: "/product", element: <Product addToCart={addToCart} /> },
  { path: "/add-pet", element: <AddPet /> },
  { path: "/adopt", element: <Adopt /> },
  { path: "/pet/:petId", element: <PetDetail /> },
  { path: "/cart", element: <CartPage /> },
  { path: "/product/:productId", element: <ProductDetailPage /> },
  { path: "/account", element: <Account /> },
  { path: "/payment", element: <Payment /> },
  { path: "/ordercomplete", element: <OrderComplete /> } // Add route for OrderCompletePage
]);

// CartPage component to render cart
function CartPage() {
  const [cartState, dispatch] = React.useReducer(cartReducer, initialCartState);

  // Pass dispatch function to addToCart directly
  const addToCart = (item) => dispatch({ type: "ADD_TO_CART", payload: item });

  return <Cart cart={cartState} />;
}

// Create Root component to render the app
function Root() {
  return (
    <RouterProvider router={router}>
      <CartPage />
    </RouterProvider>
  );
}

// Render the Root component
createRoot(document.getElementById("root")).render(<Root />);
