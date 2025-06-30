import React, { useState } from 'react';
import Header from "./Header";
import ProductsMain from "../Products/ProductsMain";
import Recommended from "../Recommended/Recommended";
import Sidebar from "../Sidebar/Sidebar";
import ProductCard from "../components/ProductCard";
import products from "../db/Productdata";

const Product = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value === 'All' ? null : value);
    setSelectedCompany(null); // Clear selected company when a normal filter is applied
  };

  const handlePriceChange = (value) => {
    setSelectedPriceRange(value);
    setSelectedCompany(null); // Clear selected company when a normal filter is applied
  };

  const handleColorChange = (value) => {
    setSelectedColor(value);
    setSelectedCompany(null); // Clear selected company when a normal filter is applied
  };

  const handleRecommendedClick = (company) => {
    setSelectedCategory(null); // Clear the selected category
    setSelectedPriceRange(null); // Clear the selected price range
    setSelectedColor(null); // Clear the selected color
    setSelectedCompany(company); // Set the selected company based on recommended category
  };

  // Filter products based on the selected filters
  const filteredProducts = products.filter(product => {
    let categoryMatch = true;
    let priceRangeMatch = true;
    let colorMatch = true;
    let companyMatch = true;

    if (selectedCategory && product.category !== selectedCategory) {
      categoryMatch = false;
    }
    if (selectedPriceRange && parseFloat(product.newPrice) > selectedPriceRange) {
      priceRangeMatch = false;
    }
    if (selectedColor && product.color !== selectedColor) {
      colorMatch = false;
    }
    if (selectedCompany && product.company !== selectedCompany) {
      companyMatch = false;
    }

    return categoryMatch && priceRangeMatch && colorMatch && companyMatch;
  });

  // Render filtered products
  const renderFilteredProducts = () => {
    return filteredProducts.map(product => (
      <ProductCard key={product.id} {...product} />
    ));
  };

  return (
    <div>
      <Header />
      <Sidebar 
        setSelectedCategory={handleCategoryChange} 
        setSelectedPriceRange={handlePriceChange}
        setSelectedColor={handleColorChange}
      />
      <Recommended handleRecommendedClick={handleRecommendedClick} />
      <ProductsMain result={renderFilteredProducts()} />
    </div>
  );
}

export default Product;
