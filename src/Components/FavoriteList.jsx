import React from 'react';
import { useFavorites } from '../Context/FavoritesContext';
import Product from './Product';
import { Link } from 'react-router-dom';

const FavoriteList = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    return (
        <div className="container mx-auto p-4">
             <div className="flex justify-end items-center mb-4">
                <div>
                    <Link to="/home" className="text-blue-800 font-medium text-lg hover:underline mr-4">
                        ← Volver al Home
                    </Link>
                    <Link to="/cart" className="text-blue-800 font-medium text-lg hover:underline">
                        Ir al Carrito →
                    </Link>
                </div>
            </div>
            <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
            <div className="flex flex-wrap gap-4">
                {favorites.length === 0 ? (
                    <p className="text-center w-full">No tienes productos en favoritos.</p>
                ) : (
                    favorites.map((item) => (
                        <div key={item.id} className="flex-shrink-0 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                            <div className="bg-white border rounded-lg shadow-lg flex flex-col h-full transition-transform transform hover:scale-105 overflow-hidden">
                                {/* Contenedor de producto */}
                                <div className="flex-grow flex items-center justify-center p-4">
                                    <Product product={item.product} />
                                </div>
                                {/* Botón de eliminar */}
                                <button
                                    onClick={() => removeFromFavorites(item.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 mt-auto"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoriteList;
