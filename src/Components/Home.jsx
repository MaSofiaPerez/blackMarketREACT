import React, {useEffect, useState} from 'react';
import ProductCarousel from "./PoductCarousel"

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
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
  
  const handleSearchQuery = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteringProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="border border-gray-200 shadow-md p-1 m-4">
      <div className='mb-4 p-6'>
        <input
          type='text'
          placeholder='Buscar productos...'
          value={searchQuery}
          onChange={handleSearchQuery}
          className='w-full p-2 border border-gray-200 rounded'
        />
      </div>
        <h3 className="text-2xl font-bold mb-4">Productos</h3>
        <ProductCarousel products={filteringProducts}/> 
    </div>
  )
}

export default Home