// ProductCard.js

import React from 'react';
import { Link } from 'react-router-dom';
import { BsFillBagHeartFill } from 'react-icons/bs';

function ProductCard({ img, title, star, reviews, prevPrice, newPrice, id }) {
  return (
    <Link to={`/product/${id}`}> {/* Encode the title */}
      <section className="card" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ width: '200px', height: '200px', overflow: 'hidden', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <img className="card-img" src={img} alt={title} style={{ width: '100%', height: 'auto' }} />
        </div>
        <div className="card-details">
          <h3 className="card-title">{title}</h3>
          <section className="card-reviews">
            {star}
            {star}
            {star}
            {star}
            <span className="total-reviews">{reviews}</span>
          </section>
          <section className="card-price">
            <div className="price">
              <del>{prevPrice}</del> {newPrice}
            </div>
            <div className="bag">
              <BsFillBagHeartFill className="bag-icon" />
            </div>
          </section>
        </div>
      </section>
    </Link>
  );
}

export default ProductCard;
