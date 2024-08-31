import { useState, useEffect } from 'react';
import axios from 'axios';
import Order from './Order';

const OrdersView = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const token = localStorage.getItem('access-token');
    const uid = localStorage.getItem('uid');
    const client = localStorage.getItem('client');
    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('https://rs-blackmarket-api.herokuapp.com/api/v1/orders', {
                    headers: {
                        "access-token": token,
                        uid: uid,
                        client: client,
                        "Content-type": "application/json"
                    },
                });
                setOrders(response.data.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) {
        return <p className="text-center text-gray-500">Loading...</p>;
    }

    if (error) {
        return <p className="text-center text-red-500">Error: {error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Tus ordenes</h2>
            {orders.length > 0 ? (
                <ul>
                    {orders.map((order) => (
                        <li key={order.id}>
                            <Order
                                id={order.id}
                                total={order.total_price}
                                items={order.line_items} // Pasar line_items para las imágenes
                            />
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No hemos encontrado órdenes.</p>
            )}
        </div>
    );
};

export default OrdersView;
