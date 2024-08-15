import React from 'react';
import { useCart } from '../Context/CartContext';

const Cart = () => {

    // Falta agregar funciones de aumentar y disminuir cantidad, y borrar producto
    const { cart } = useCart();

    if (cart.length === 0){
        return <p className='font-bold'>Tu carrito esta vacío</p>;
    }

    return(
        <div className='container p-5 mx-auto'>
            <h2 className='font-bold text-center mb-5'>Tu carrito</h2>
            {cart.map((item) => (
                <div key={item.id} className='justify-between'>
                    <div>
                        <h4 className='font-semibold'>{item.title}</h4>
                        <p>{item.unit_price}</p>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default Cart
