import React, { useEffect, useState } from 'react';
import Product from './Product';

const ProductCarousel = ( {products}) => {
  
  return (
    <div className="carousel-container m-8 p-4">
      <div className="flex space-x-4 overflow-x-scroll">
      {
          products.map(product => (
          <Product key={product.id} product={product} /> 
        )) 
      }
      </div>
    </div>
  );
};

export default ProductCarousel;

