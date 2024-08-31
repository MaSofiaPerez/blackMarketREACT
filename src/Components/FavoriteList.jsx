import React from 'react';
import { useFavorites } from '../Context/FavoritesContext';
import Product from './Product';

const FavoriteList = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-6">Mis Favoritos</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {favorites.length === 0 ? (
                    <p className="w-full text-gray-500 text-center">No tienes productos en favoritos.</p>
                ) : (
                    favorites.map((item) => (
                        <div key={item.product.id} className="bg-white border rounded-lg shadow-md overflow-hidden flex flex-col">
                            <Product product={item.product} />
                            <button
                                onClick={() => removeFromFavorites(item.product.id)}
                                className="bg-red-500 text-white px-3  py-2 rounded-t-none rounded-b-lg hover:bg-red-600 mt-auto"
                            >
                                Eliminar
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default FavoriteList;
