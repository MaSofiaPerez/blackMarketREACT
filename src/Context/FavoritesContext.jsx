// src/Context/FavoritesContext.jsx
import { createContext, useState, useContext, useEffect } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    const loadFavorites = async () => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');

        try {
            const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/products/favorites', {
                method: 'GET',
                headers: {
                    'access-token': token,
                    uid: uid,
                    client: client,
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (response.ok) {
                setFavorites(data.data || []);
            } else {
                console.log('Error al cargar favoritos:', data.errors || 'Error desconocido');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    useEffect(() => {
        loadFavorites();
    }, []);


    const addToFavorites = async (product) => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');

        try {
            const response = await fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/products/${product.id}/favorite`, {
                method: 'POST',
                headers: {
                    'access-token': token,
                    uid: uid,
                    client: client,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                setFavorites([...favorites, {product}]);
            } else {
                throw new Error('El producto ya ha sido agregado a favoritos')
            }
        } catch (error) {
            console.log('Error:', error);
            throw error;
        }

    };


    const removeFromFavorites = async (productId) => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');

        try {
            const response = await fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/products/${productId}/favorite`, {
                method: 'DELETE',
                headers: {
                    'access-token': token,
                    uid: uid,
                    client: client,
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                loadFavorites()
            } else {
                const data = await response.json();
                console.log('Error al eliminar de favoritos:', data.errors || 'Error desconocido');
            }
        } catch (error) {
            console.log('Error:', error);
        }
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = () => useContext(FavoritesContext);
