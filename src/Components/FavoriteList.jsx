import React from 'react';
import { useFavorites } from '../Context/FavoritesContext';
import Product from './Product';


const FavoriteList = () => {
    const { favorites, removeFromFavorites } = useFavorites();

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Mis Favoritos</h1>
            <div className="flex flex-wrap gap-4">
                {favorites.length === 0 ? (
                    <p className=" w-full">No tienes productos en favoritos.</p>
                ) : (
                    favorites.map((item) => (
                        <div key={item.product.id} className="flex-shrink-0 w-full sm:w-1/3 md:w-1/4 lg:w-1/5 p-2">
                            <div className="bg-white border rounded-lg shadow-lg flex flex-col h-full">
                                <div className="flex-grow flex items-center justify-center p-4">
                                    <Product product={item.product} />
                                </div>
                                <button
                                    onClick={() => removeFromFavorites(item.product.id)}
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
