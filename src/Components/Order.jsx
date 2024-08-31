import React from 'react';

const Order = ({ id, total, items }) => {
    return (
        <div className="border border-gray-300 rounded p-4 mb-4">
            <h3 className="text-xl font-semibold mb-2">Orden #{id}</h3>
            <p>Total: {total}</p>
            <div className="mt-4">
                <h4 className="text-lg font-semibold">Productos:</h4>
                <ul>
                    {items.map((item) => (
                        <li key={item.id} className="mb-2">
                            <div className="flex items-center">
                                <img
                                    src={item.product.pictures[0]} 
                                    alt={item.product.title}
                                    className="w-16 h-16 object-cover mr-4"
                                />
                                <div>
                                    <h5 className="font-semibold">{item.product.title}</h5>
                                    <p>Cantidad: {item.quantity}</p>
                                    <p>Precio Unitario: {item.unit_price}</p>
                                    <p>Precio Total: {item.total_price}</p>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Order;
