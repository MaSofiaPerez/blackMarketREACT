import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';
import { useAuth } from '../Context/AuthContext';

const ProductDetail = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false)
    const { isAuthenticated } = useAuth()
    const navigate = useNavigate()
    const token = localStorage.getItem('access-token')
    const uid = localStorage.getItem('uid')
    const client = localStorage.getItem('client')

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
    }, [id, isAuthenticated, navigate])

    const handleAddToCart = () => {
        fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart/line_items`, {
            method: 'POST',
            headers: {
                'access-token': token,
                uid: uid,
                client: client,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({
                line_item: {
                    quantity: 1, 
                    product_id: id 
                }
             })
        })
            .then(response => response.json())
            .then(data => console.log('Producto añadido al carrito: ', data))
            .catch(error => console.log('Error al añadir al carrito: ', error))
    }

    const handleAddToFavorites = () => {
        fetch(`https://rs-blackmarket-api.herokuapp.com//api/v1/products/${id}/favorite`, {
            method: 'POST',
            headers: {
                'access-token': token,
                uid: uid,
                client: client,
                'Content-type': 'application/json'
            },
            body: JSON.stringify({ product_id: id })
        })
            .then(response => response.json())
            .then(data => {
                console.log('Producto añadido a favoritos: ' + data)
                setIsFavorite(true)
            })
            .catch(error => console.log('Error al añadir a favoritos: ' + error))

    }

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
    </div>
    )
}

export default ProductDetail