import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const { isAuthenticated } = useAuth()
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('access-token')
    const uid = localStorage.getItem('uid')
    const client = localStorage.getItem('client')
    const {addItemToCart} = useCart()

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login')
            return
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
            .then(data => setProduct(data))
            .catch(error => console.log('Error: ', error))
    }, [isAuthenticated, navigate])

    const handleAddToCart = async () => {
        try {
            await addItemToCart(id, 1);
            setShowPopUp(true); // Muestra el mensaje emergente
        } catch (error) {
            console.error('Error al añadir al carrito:', error);
        }
    }
    const handleAddToFavorites = () => {
        fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/products/${id}/favorite`, {
            method: 'POST',
            headers: {
                'access-token': token,
                uid: uid,
                client: client,
                'Content-type': 'application/json'
            }
        })
        .then(async (response) => {
            if (!response.ok) {
                // Intenta extraer la información de error desde la respuesta del servidor
                const errorData = await response.json();
                throw new Error(errorData.errors || 'Error desconocido al añadir a favoritos');
            }
            return response.json();
        })
        .then(data => {
            console.log('Producto añadido a favoritos:', data);
            setIsFavorite(true);
        })
        .catch(error => {
            console.error('Error al añadir a favoritos:', error.message);
        });
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
    

    if (!product) return <p>Loading...</p>;


    return (
        <div className="container mx-auto p-4">
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
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-500 text-white px-4 py-2 rounded mb-2"
                    >
                        Agregar al carrito
                    </button>
                    <button
                        onClick={handleAddToFavorites}
                        className={`ml-4 px-4 py-2 rounded ${isFavorite ? 'bg-yellow-500' : 'bg-gray-500'}`}
                    >
                        {isFavorite ? 'Agregado a Favoritos' : 'Agregar a Favoritos'}
                    </button>
                </div>
            </div>

            {showPopUp && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm mx-4">
                        <h3 className="text-xl font-bold mb-4">¡Producto añadido al carrito!</h3>
                        <p className="mb-4">¿Desea ir al carrito o seguir comprando?</p>
                        <div className="flex justify-between">
                            <button
                                onClick={handleGoToCart}
                                className="bg-blue-500 text-white px-4 py-2 rounded"
                            >
                                Ir al Carrito
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="bg-gray-500 text-white px-4 py-2 rounded"
                            >
                                Seguir Comprando
                            </button>
                        </div>
                        <button
                            onClick={handleClosePopUp}
                            className="absolute top-2 right-2 text-gray-500"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ProductDetail