import React, { useState, useEffect } from 'react';
import { useCart } from '../Context/CartContext';
import CartItem from './CartItem'; 
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Context/AuthContext';

const Cart = () => {
    const { cart, updateItemQuantity, removeItem } = useCart();
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('name');
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const filteredCart = cart.filter(item => 
        item.product.title.toLowerCase().includes(search.toLowerCase())
    );

    const sortedCart = filteredCart.sort((a, b) => {
        if (sort === 'price') {
            return parseFloat(a.product.unit_price.slice(1)) - parseFloat(b.product.unit_price.slice(1));
        }
        return a.product.title.localeCompare(b.product.title);
    });

    const totalPrice = sortedCart.reduce((total, item) => {
        const price = parseFloat(item.product.unit_price.slice(1));
        return total + (price * item.quantity);
    }, 0);

    return (
        <div className="container mx-auto p-6">
           <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold">Tu carrito</h2>
                <button 
                    onClick={() => navigate('/home')}
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                >
                    Ir al Home
                </button>
            </div>
            <div className="mb-4">
                <input 
                    type="text" 
                    placeholder="Buscar productos" 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="p-2 border border-gray-300 rounded w-full"
                />
            </div>
            <div className="mb-4 flex space-x-4">
                <button 
                    onClick={() => setSort('name')}
                    className={`px-4 py-2 rounded ${sort === 'name' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Ordenar por nombre
                </button>
                <button 
                    onClick={() => setSort('price')}
                    className={`px-4 py-2 rounded ${sort === 'price' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}
                >
                    Ordenar por precio
                </button>
            </div>
            <div className="flex flex-col gap-4">
                {sortedCart.map((item) => (
                    <CartItem 
                        key={item.product.id}
                        item={item}
                        onQuantityChange={updateItemQuantity}
                        onRemove={removeItem}
                    />
                ))}
            </div>
            <div className="mt-4 text-right">
                <h3 className="text-xl font-bold">Total: ${totalPrice.toFixed(2)}</h3>
            </div>
        </div>
    );
};

export default Cart;

