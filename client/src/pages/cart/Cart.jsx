import React from "react";
import CartContainer from "../../components/pages/cart/cart/Cart";
import CartHero from "../../components/pages/cart/hero/CartHero";
import "./cart.scss";

const Cart = () => {
    return (
        <div className="cart">
            <CartHero />
            <CartContainer />
        </div>
    );
};

export default Cart;
