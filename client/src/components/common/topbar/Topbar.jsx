import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../../context/cartContext/CartContext";
import CartWidget from "./cartWidget/CartWidget";
import "./topbar.scss";

const Topbar = () => {
    const [menuOn, setMenuOn] = useState(false);
    const { admin } = useContext(CartContext);
    return (
        <div className="topbarContainer">
            <nav className="topbar">
                <div className="left">
                    <ul>
                        <li>
                            <Link to="/">Home</Link>
                        </li>
                        <li>
                            <Link to="/menu">Menu</Link>
                        </li>
                        <li>
                            <Link to="/contact">Contact</Link>
                        </li>
                        {admin && (
                            <li>
                                <Link to="/admin">Admin View</Link>
                            </li>
                        )}
                    </ul>
                </div>
                <div className="right">
                    <CartWidget />
                    <button>Sign Up</button>
                </div>
            </nav>

            <nav
                className={
                    menuOn ? "responsiveTopbar active" : "responsiveTopbar"
                }
            >
                <div
                    className="hamburger"
                    onClick={() => {
                        setMenuOn((prevState) => !prevState);
                    }}
                >
                    <span className="line1"></span>
                    <span className="line2"></span>
                    <span className="line2"></span>
                </div>
                <nav
                    className={
                        menuOn
                            ? "topbar responsive active"
                            : "topbar responsive"
                    }
                >
                    <div className="left">
                        <ul>
                            <li
                                onClick={() => {
                                    setMenuOn((prevState) => !prevState);
                                }}
                            >
                                <Link to="/">Home</Link>
                            </li>
                            <li
                                onClick={() => {
                                    setMenuOn((prevState) => !prevState);
                                }}
                            >
                                <Link to="/menu">Menu</Link>
                            </li>
                            <li
                                onClick={() => {
                                    setMenuOn((prevState) => !prevState);
                                }}
                            >
                                <Link to="/contact">Contact</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="right">
                        <CartWidget />
                        <button>Sign Up</button>
                    </div>
                </nav>
            </nav>
        </div>
    );
};

export default Topbar;
