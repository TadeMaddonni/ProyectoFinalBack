import React from "react";
import "./itemDetailHero.scss";
const ItemDetailHero = (props) => {
    return (
        <div className="itemDetailHeroContainer">
            <div className="itemDetailHero">
                <h1>Food & Chill</h1>
                <span>{props.name}</span>
            </div>
        </div>
    );
};

export default ItemDetailHero;
