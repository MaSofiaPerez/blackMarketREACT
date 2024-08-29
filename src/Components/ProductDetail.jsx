import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';
import FavoriteButton from './FavoriteButton';
import AddToCartButton from './AddToCartButton';
import ProductCarousel from './PoductCarousel';


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [recommendedProducts, setRecommendedProducts] = useState([]);
    const [errorMessage, setErrorMessage] = useState(null);
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const token = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/products/${id}`, {
            method: 'GET',
            headers: {
                'access-token': token,
                uid: uid,
                client: client,
                'Content-type': 'application/json'
            }
        })
            .then(response => response.json())
            .then(data => {
                setProduct(data);

                fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/products?categories[]=${data.category.name}`, {
                    method: 'GET',
                    headers: {
                        'access-token':token,
                        uid: uid,
                        client: client,
                        'Content-type': 'application/json'
                    }
                })
                .then(response => response.json())
                .then(data => setRecommendedProducts(data.data))
                .catch(error => {
                    console.log('Error: ', error);
                    setErrorMessage('Ocurrió un error al cargar productos recomendados.')
                })
             })
            .catch(error => {
                console.log('Error: ', error);
                setErrorMessage('Ocurrió un error al cargar el producto.');
            });
    }, [isAuthenticated, navigate, id, token, uid, client]);

    if (!product) return <p>Loading...</p>;

    return (
        <div className="container mx-auto p-4 relative">
            <div className="flex justify-between items-start mb-4">
                <div>
                    <Link to="/home" className="text-blue-800 font-medium text-lg hover:underline">
                        ← Volver al Home
                    </Link>
                </div>
                <div className="flex space-x-4">
                    <Link to="/favorites" className="text-blue-800 font-medium text-lg hover:underline flex items-center">
                        Ir a Favoritos →
                    </Link>
                    <Link to="/cart" className="text-blue-800 font-medium text-lg hover:underline flex items-center">
                        Ir al Carrito →
                    </Link>
                </div>
            </div>

            <div className="flex flex-col lg:flex-row">
                <div className="w-1/2 h-96 mb-4">
                    <img
                        src={product.pictures[0]}
                        alt={product.title}
                        className="w-full h-full object-contain"
                    />
                </div>
                <div className="lg:w-1/2">
                    <h2 className="text-3xl font-bold mb-4">{product.title}</h2>
                    <p className="text-lg mb-4">{product.description}</p>
                    <p className="text-xl font-bold mb-4">${product.unit_price}</p>

                    <div className="w-full flex flex-col">
                        <div className="flex space-x-4 mb-4">
                            <AddToCartButton productId={id} stock={product.stock}/>
                            <FavoriteButton product={product} />
                        </div>
                    </div>

                    {errorMessage && (
                        <div className="bg-red-500 text-white px-2 py-2 rounded shadow-md inline-block">
                            {errorMessage}
                        </div>
                    )}
                </div>
            </div>
            <div className='mt-8'>
                <h3 className='text-2xl font-bold mb-4'>Productos recomendados</h3>
                <ProductCarousel products={recommendedProducts}></ProductCarousel>
            </div>
        </div>
    );
};

export default ProductDetail;
