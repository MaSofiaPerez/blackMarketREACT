import { useNavigate, useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';
import { useCart } from '../Context/CartContext';
import { useFavorites } from '../Context/FavoritesContext'; 


const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const { isAuthenticated } = useAuth()
    const [showPopUp, setShowPopUp] = useState(false);
    const navigate = useNavigate()
    const token = localStorage.getItem('access-token')
    const uid = localStorage.getItem('uid')
    const client = localStorage.getItem('client')
    const {addItemToCart} = useCart()
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites(); 


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
            setShowPopUp(true); 
        } catch (error) {
            console.error('Error al añadir al carrito:', error);
        }
    }
    const handleAddToFavorites = () => {
        if (favorites.includes(id)) {
            removeFromFavorites(id);
        } else {
            addToFavorites(id);
        }
    };

    const isFavorite = favorites.includes(id); 

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
             <div className="mb-4">
             <Link to="/home" className="text-blue-800 font-medium text-lg hover:underline">
                    ← Volver al Home
                </Link>
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
                    <button
                        onClick={handleAddToCart}
                        className="bg-blue-800 text-white font-medium px-4 py-2 rounded mb-2"
                    >
                        Agregar al carrito
                    </button>
                    <button
                        onClick={handleAddToFavorites}
                        className={`ml-4 px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black font-medium'}`}
                    >
                        {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
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
                                className="bg-blue-800 font-medium text-white px-4 py-2 rounded"
                            >
                                Ir al Carrito
                            </button>
                            <button
                                onClick={handleContinueShopping}
                                className="bg-slate-500 font-medium text-white px-4 py-2 rounded"
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