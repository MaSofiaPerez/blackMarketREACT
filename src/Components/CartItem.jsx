import React from 'react'

const CartItem = ({ item, onQuantityChange, onRemove }) => {
    const { product, quantity } = item;
    return (
        <div className='flex items-center justify-between border-b py-4'>
            <img src={product.pictures[0]} alt={product.title} className='w-20 h-20 object-cover rounded' />
            <div className='flex-1 ml-4'>
                <h4 className='text-lg font-bold'>{product.title}</h4>
                <p className='text-gray-600'>{product.unit_price}</p>
                <p className='text-gray-600'>Cantidad: {quantity}</p>
            </div>
            <div className='flex items-center space-x-2'>
                <button
                    onClick={() => onQuantityChange(item.id, quantity - 1)}
                    className="px-2 py-1 bg-gray-300 font-medium rounded text-gray-700 hover:bg-gray-400"
                    disabled={quantity <= 1}
                >
                    -
                </button>
                <button
                    onClick={() => onQuantityChange(item.id, quantity + 1)}
                    className="px-2 py-1 bg-gray-300 font-medium rounded text-gray-700 hover:bg-gray-400"
                >
                    +
                </button>
                <button
                    onClick={() => onRemove(item.id)}
                    className="px-4 py-2 bg-red-600 font-medium text-white rounded hover:bg-red-700"
                >
                    Eliminar
                </button>

            </div>

        </div>
    )
}

export default CartItem