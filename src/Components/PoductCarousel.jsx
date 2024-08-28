import React, { useEffect, useState } from 'react';
import Product from './Product';

const ProductCarousel = ( {products}) => {
  
  return (
    <div className="carousel-container mt-8 p-4">
      <div className="flex space-x-4 overflow-x-scroll">
        {products.length > 0 ? (
          products.map(product => (
          <Product key={product.id} product={product} /> 
        )) 
        ) : (
          <p>No tenemos el producto que buscas.</p>
        )}
      </div>
    </div>
  );
};

export default ProductCarousel;

