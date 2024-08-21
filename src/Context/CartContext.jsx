import { createContext, useState, useContext, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const loadCart = async () => {
            const token = localStorage.getItem('access-token');
            const uid = localStorage.getItem('uid');
            const client = localStorage.getItem('client');

            try {
                const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart', {
                    method: "GET",
                    headers: {
                        "access-token": token,
                        uid: uid,
                        client: client,
                        "Content-type": "application/json"
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setCart(data.line_items || []);
                } else {
                    console.log("Error al cargar el carrito: ", data.errors || "Error desconocido");
                }
            } catch (error) {
                console.log("Error: ", error);
            }
        };

        loadCart();
    }, []);

    const addItemToCart = async (productId, quantity) => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');

        try {
            const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart/line_items', {
                method: 'POST',
                headers: {
                    'access-token': token,
                    uid: uid,
                    client: client,
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({
                    line_item: {
                        quantity: quantity,
                        product_id: productId
                    }
                })
            });

            const data = await response.json();

            if (response.ok) {
                setCart(prevCart => [...prevCart, data]); // Actualiza el carrito local
            } else {
                console.log("Error al añadir al carrito: ", data.errors || "Error desconocido");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    //NO FUNCIONA
    const removeItem = async (productId) => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');

        try {
            const response = await fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart/line_items/${productId}`, {
                method: 'DELETE',
                headers: {
                    'access-token': token,
                    uid: uid,
                    client: client,
                    'Content-type': 'application/json'
                }
            });

            const data = await response.json();

            if (response.ok) {
                loadCart();
            } else {
                console.log("Error al eliminar el producto: ", data.errors || "Error desconocido");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };
    //NO FUNCIONA
    const updateItemQuantity = async (productId, newQuantity) => {
        const token = localStorage.getItem('access-token');
        const uid = localStorage.getItem('uid');
        const client = localStorage.getItem('client');
        console.log(productId)

        try {
            const response = await fetch(`https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart/line_items/${productId}`, {
                method: 'PATCH',
                headers: {
                    'accept': 'application/json',
                    'Content-Type': 'application/json',
                    'access-token': token,
                    'uid': uid,
                    'client': client
                },
                body: JSON.stringify({
                    line_item: {
                        quantity: newQuantity
                    }
                })
            });
            const data = await response.json();

            if (response.ok) {
                loadCart();
            } else {
                console.log("Error al actualizar la cantidad: ", data.errors || "Error desconocido");
            }
        } catch (error) {
            console.log("Error: ", error);
        }
    };



    return (
        <CartContext.Provider value={{ cart, updateItemQuantity, removeItem, addItemToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
