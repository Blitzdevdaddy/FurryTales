import React from 'react';
import "./Recommended.css";
import ProductButtons from '../components/ProductButtons';

function Recommended({ handleRecommendedClick }) {
  return (
    <div>
      <h2 className="recommended-title">
        Recommended
      </h2>
      <div className="recommended-flex">
        <ProductButtons onClickHandler={() => handleRecommendedClick('')} value="" title="All"/>
        <ProductButtons onClickHandler={() => handleRecommendedClick('Bonkers')} value="Bonkers" title="Bonkers"/>
        <ProductButtons onClickHandler={() => handleRecommendedClick('Blitz')} value="Blitz" title="Blitz"/>
        <ProductButtons onClickHandler={() => handleRecommendedClick('Pedigree')} value="Pedigree" title="Pedigree"/>
        <ProductButtons onClickHandler={() => handleRecommendedClick('Eimeli')} value="Eimeli" title="Eimeli"/>
      </div>
    </div>
  );
}

export default Recommended;
