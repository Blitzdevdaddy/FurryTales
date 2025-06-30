// FilterContext.js
import React, { createContext, useContext, useState } from 'react';

const FilterContext = createContext();

export const useFilterContext = () => useContext(FilterContext);

export const FilterProvider = ({ children }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    category: null,
    price: null,
    color: null
  });

  const handleFilterChange = (filterType, value) => {
    setSelectedFilters(prevFilters => ({
      ...prevFilters,
      [filterType]: value
    }));
  };

  return (
    <FilterContext.Provider value={{ selectedFilters, handleFilterChange }}>
      {children}
    </FilterContext.Provider>
  );
};
