import React, { useState } from 'react';
import { useCart } from '../Context/CartContext';
import {  useNavigate, Link } from 'react-router-dom';

const AddToCartButton = ({ productId }) => {
    const { addItemToCart } = useCart();
    const [errorMessage, setErrorMessage] = useState('');
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate()

    const handleClick = async () => {
        try {
            await addItemToCart(productId, 1);
            setErrorMessage('');
            setShowPopUp(true);
            setTimeout(() => setShowPopUp(false), 5000); // Ocultar pop-up después de 5 segundos
        } catch (error) {
            if (error.message === 'El producto ya está en el carrito.') {
                setErrorMessage(<div>
                    El producto ya está en el carrito.{' '}
                    <Link to="/cart" className="text-white font-medium underline">
                        Ir al carrito
                    </Link>
                </div>);
            } else {
                setErrorMessage('Ocurrió un error al añadir el producto al carrito.');
            }
            setTimeout(() => setErrorMessage(''), 7000); // Limpiar mensaje después de 7 segundos
        }
    };
    const handleClosePopUp = () => {
        setShowPopUp(false);
    };
    
    const handleGoToCart = () => {
        navigate('/cart');
        handleClosePopUp();
    };
    
    const handleContinueShopping = () => {
        navigate('/home');
        handleClosePopUp();
    };

    return (
        <div className="relative">
        <button
            onClick={handleClick}
            className="bg-blue-800 text-white font-medium px-4 py-2 rounded hover:bg-blue-900"
        >
            Agregar al carrito
        </button>
        {errorMessage && (
            <div className="absolute  bg-red-600 mt- text-white px-4 py-2 rounded shadow-md z-50">
                  {errorMessage}
            </div>
        )}
        {showPopUp && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
                    <h3 className="text-xl font-bold mb-4">¡Producto añadido al carrito!</h3>
                    <p className="mb-4">¿Desea ir al carrito o seguir comprando?</p>
                    <div className="flex justify-between">
                        <button
                            onClick={handleGoToCart}
                            className="bg-blue-800 font-medium text-white px-4 py-2 rounded hover:bg-blue-900"
                        >
                            Ir al Carrito
                        </button>
                        <button
                            onClick={handleContinueShopping}
                            className="bg-slate-500 font-medium text-white px-4 py-2 rounded hover:bg-slate-600"
                        >
                            Seguir Comprando
                        </button>
                    </div>
                    <button
                        onClick={handleClosePopUp}
                        className="absolute top-2 right-2 text-gray-500"
                    >
                        <svg
                            className="w-6 h-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>
        )}
    </div>
    );
};

export default AddToCartButton;
