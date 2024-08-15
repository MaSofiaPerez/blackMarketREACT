import { createContext, useState, useContext, useEffect } from 'react'

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    useEffect(() => {
        const load = async () => {
            const token = localStorage.getItem('access-token');
            const uid = localStorage.getItem('uid');
            const client = localStorage.getItem('client');

            try{
                const response = await fetch('https://rs-blackmarket-api.herokuapp.com/api/v1/shopping_cart', {
                    method: "GET", 
                    headers: {
                        "access-token": token, 
                        uid: uid, 
                        client: client, 
                        "Content-type": "application/json"
                    }
                })

                const data = await response.json();

                if (response.ok) {
                    if (data.status === "success") {
                        setCart(data.line_items || []);
                    }
                }
                else{
                    console.log("Error al cargar el carrito: ", data.message || "Error desconocido");
                }
            }
            catch(error){
                console.log("Error: ", error)
            }
        } 
        load();
    }, [cart]);

    return (
       <CartContext.Provider value = {cart}>

       { children }
       
       </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);