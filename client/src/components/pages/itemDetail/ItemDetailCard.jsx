import React, { useContext, useEffect, useState } from "react";
import ItemCount from "./itemCount/ItemCount";
import "./itemDetailCard.scss";
import { CartContext } from "../../../context/cartContext/CartContext";
const ItemDetailCard = ({ item }) => {
    const [quantity, setQuantity] = useState(item.quantity || 1);
    const [errorMessage, setErrorMessage] = useState("");

    const cart = useContext(CartContext)
    console.log(cart)
    const increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
        setErrorMessage("");
    };
    const decrement = () => {
        if (quantity <= 1) {
            setErrorMessage("The minimun quantity for this product is 1");
            setQuantity(1);
        } else {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    return (
        <div className="itemDetailCardContainer">
            <div className="itemDetailCard">
                <div className="left">
                    <img src={item.img} alt="" />
                </div>
                <div className="right">
                    <h3>{item.name}</h3>
                    <p>{item.info}</p>
                    <div className="bottomRight">
                        <span>${item.price}</span>

                        <ItemCount
                            quantity={quantity}
                            increment={increment}
                            decrement={decrement}
                        />
                        <button onClick={() => { cart.addItem(item, quantity)}}>Add to cart</button>
                    </div>
                    {errorMessage != "" && <span className="italic">{errorMessage}</span>}
                </div>
            </div>
        </div>
    );
};

export default ItemDetailCard;
