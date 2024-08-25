import React, { useEffect, useState } from 'react';
import { useFavorites } from '../Context/FavoritesContext';

const FavoriteButton = ({ product }) => {
    const { favorites, addToFavorites, removeFromFavorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const checkIfFavorite = () => {
            if (product && product.id) {
                setIsFavorite(favorites.some(fav => fav.product && fav.product.id === product.id));
            }
        };

        checkIfFavorite();
    }, [favorites, product]);

    const handleClick = async () => {
        try {
            if (isFavorite) {
                await removeFromFavorites(product.id);
            } else {
                await addToFavorites(product);
            }
            setErrorMessage(''); 
        } catch (error) {
            setErrorMessage(error.message || 'Error al actualizar favoritos.');
            setTimeout(() => setErrorMessage(''), 7000); 
        }
    };

    return (
        <div className="relative">
            <button
                onClick={handleClick}
                className={`px-4 py-2 rounded ${isFavorite ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black font-medium'}`}
            >
                {isFavorite ? 'Eliminar de Favoritos' : 'Agregar a Favoritos'}
            </button>
            {errorMessage && (
                <div className="absolute top-full left-0 mt-2 bg-red-600 text-white px-4 py-2 rounded shadow-md z-50">
                    {errorMessage}
                </div>
            )}
        </div>
    );
};

export default FavoriteButton;
