import React, { useEffect, useState } from 'react';
import Product from './Product';

const ProductCarousel = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access-token'); 
    const uid = localStorage.getItem('uid')
    const client = localStorage.getItem('client')

    fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/products', {
      method: 'GET',
      headers: {
        'access-token': token,
        uid:uid,
        client: client, 
        'Content-type': 'application/json'
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setProducts(data.data))  
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  return (
    <div className="carousel-container mt-8 p-4">
      <h3 className="text-2xl font-bold mb-4">Productos</h3>
      <div className="flex space-x-4 overflow-x-scroll">
        {products.map(product => (
          <Product key={product.id} product={product} /> 
        ))}
      </div>
    </div>
  );
};

export default ProductCarousel;

