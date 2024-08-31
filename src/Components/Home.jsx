import React, {useEffect, useState} from 'react';
import ProductCarousel from "./PoductCarousel"
import SearchBar from './SearchBar';

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);


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
          setError(data.errors)
        }
        return response.json();
      })
      .then(data => {
        setProducts(data.data);
        setLoading(false);
      })  
      .catch(error => {
        setError('No se pudo cargar los productos. Inténtalo de nuevo más tarde.' + error)
        setLoading(false); 
      });
  }, []);
  

  const filteringProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  if (loading) {
    return <p className="text-gray-500 text-center p-4">Cargando productos...</p>; 
  }

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>; 
  }

  return (
    <div className="border border-gray-200 shadow-md p-2 m-6">
      <div className='mb-4 p-6'>
        <SearchBar search={searchQuery} setSearch={setSearchQuery} />
      </div>
      <h3 className="text-2xl font-bold m-4">Productos</h3>
      {filteringProducts.length === 0 ? (
        <p className="text-gray-500 text-center">No hemos encontrado el producto que buscas</p>
      ) : (
        <ProductCarousel products={filteringProducts} />
      )}
    </div>
  )
}

export default Home