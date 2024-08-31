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
                        'access-token': token,
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

    if (!product) return <p>Cargando...</p>;

    return (
        <div className="container mx-auto p-4 mt-6">
            <div className="flex flex-col lg:flex-row lg:space-x-6 border border-gray-400 p-6 rounded-lg shadow-md">
                <div className="flex justify-center lg:w-1/2 mb-7 lg:mb-0 overflow-hidden ">
                    <img
                        src={product.pictures[0]}
                        alt={product.title}
                        className="w-full h-auto max-h-96 object-contain"
                    />
                </div>

                <div className="lg:w-1/2 flex flex-col justify-center mb-7">
                    <h2 className="text-3xl font-bold mb-4 text-center lg:text-left">{product.title}</h2>
                    <p className="text-lg mb-4 text-center lg:text-left">{product.description}</p>
                    <p className="text-xl font-bold mb-4 text-center lg:text-left">${product.unit_price}</p>

                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex space-x-4 mb-4">
                            <AddToCartButton productId={id} stock={product.stock} />
                            <FavoriteButton product={product} />
                        </div>

                        {errorMessage && (
                            <div className="bg-red-500 text-white px-2 py-2 rounded shadow-md inline-block">
                                {errorMessage}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="mt-10">
                <h3 className="text-2xl font-bold mb-4 text-center lg:text-left">Productos recomendados</h3>
                <ProductCarousel products={recommendedProducts} />
            </div>
        </div>
    );
};

export default ProductDetail;
