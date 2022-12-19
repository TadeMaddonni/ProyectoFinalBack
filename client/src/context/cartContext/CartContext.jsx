import { useEffect, useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router-dom";

export const CartContext = createContext();

const CartContextProvider = ({ children }) => {
    const [cartList, setCartList] = useState([]);
    console.log(cartList);
    const getCartId = async () => {
        const cartId = JSON.parse(localStorage.getItem("cartId"));
        if (cartId) {
            return cartId;
        } else {
            const response = await fetch("http://localhost:8080/api/carrito/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await response.json();
            localStorage.setItem("cartId", JSON.stringify(data.id));
            console.log(data);
            return data.id;
        }
    };
    useEffect(() => {
        getCartId();
    }, []);

    const [admin, setAdmin] = useState(true); // En el futuro se desarrollara la lógica con el login

    const addItem = async (item, qty) => {
        const id = await getCartId();
        const newItem = {
            ...item,
            quantity: qty,
        };
        console.log(newItem);
        fetch(`http://localhost:8080/api/carrito/${id}/productos`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                product: newItem,
            }),
        })
            .then((res) => res.json())
            .then((res) => console.log(res.msg));
    };

    const removeItem = async (itemId) => {
        const id = await getCartId();

        fetch(`http://localhost:8080/api/carrito/${id}/productos/${itemId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => alert(res.msg));
        setTimeout(() => {
            window.location.replace("/");
        }, 600);
    };

    const clearCart = async () => {
        const id = await getCartId();
        fetch(`http://localhost:8080/api/carrito/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((res) => console.log(res));
        localStorage.removeItem("cartId");
        setTimeout(() => {
            window.location.replace("/");
        }, 1000);
    };

    const totalPrice = () => {
        return Math.round(
            cartList.reduce(
                (totalPrice, item) => totalPrice + item.price * item.quantity,
                0
            )
        );
    };

    const TotalPrice = totalPrice();

    const countQuantity = () => {
        return Math.round(
            cartList.reduce((totalItems, item) => totalItems + item.quantity, 0)
        );
    };

    const totalItems = countQuantity();

    const countStock = (itemId) => {
        const item = cartList.find((item) => item.id === itemId);
        const newStock = item.stock - item.quantity;
        return newStock;
    };

    return (
        <CartContext.Provider
            value={{
                cartList,
                addItem,
                removeItem,
                clearCart,
                admin,
                getCartId,
                TotalPrice,
                totalItems,
                countStock,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export default CartContextProvider;
