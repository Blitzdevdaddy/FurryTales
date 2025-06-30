import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Sidebar.css'; // Import CSS file for styling

function Sidebar({ setSelectedCategory, setSelectedPriceRange, setSelectedColor }) {
  const [selectedCategory, setSelectedCategoryLocal] = useState('');
  const [selectedPrice, setSelectedPriceRangeLocal] = useState('');
  const [selectedColor, setSelectedColorLocal] = useState('');

  const categories = ['All', 'Leashes', 'Pet Toys', 'Pet Food', 'Pet Clothes'];
  const priceRanges = [
    { value: '', title: 'All' },
    { value: 100, title: 'Rs 0-100' },
    { value: 500, title: 'Rs 0-500' },
    { value: 2000, title: '0-5000' },
  ];
  const colors = [
    { value: '', title: 'All' },
    { value: 'black', title: 'Black' },
    { value: 'white', title: 'White' },
    { value: 'yellow', title: 'Yellow' },
    { value: 'blue', title: 'Blue' },
    { value: 'purple', title: 'Purple' },
    { value: 'pink', title: 'Pink' },
  ];

  const handleCategoryChange = (value) => {
    setSelectedCategoryLocal(value);
    setSelectedCategory(value);
  };

  const handlePriceChange = (value) => {
    setSelectedPriceRangeLocal(value);
    setSelectedPriceRange(value);
  };

  const handleColorChange = (value) => {
    setSelectedColorLocal(value);
    setSelectedColor(value);
  };

  return (
    <div className="sidebar">
      <div className="filter-box">
        <h5 className="filter-box-title">Category</h5>
        <Dropdown onSelect={handleCategoryChange}>
          <Dropdown.Toggle variant="light" id="category-dropdown">
            Select Category
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {categories.map((category) => (
              <Dropdown.Item key={category} eventKey={category}>
                {category}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter-box">
        <h5 className="filter-box-title">Price</h5>
        <Dropdown onSelect={handlePriceChange}>
          <Dropdown.Toggle variant="light" id="price-dropdown">
            Select Price Range
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {priceRanges.map(({ value, title }) => (
              <Dropdown.Item key={value} eventKey={value}>
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
      <div className="filter-box">
        <h5 className="filter-box-title">Color</h5>
        <Dropdown onSelect={handleColorChange}>
          <Dropdown.Toggle variant="light" id="color-dropdown">
            Select Color
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {colors.map(({ value, title }) => (
              <Dropdown.Item key={value} eventKey={value}>
                {title}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}

export default Sidebar;
