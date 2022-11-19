import React from "react";
import "./hero.scss";
const HomeHero = () => {
    return (
        <div className="homeHeroContainer">
            <div className="homeHero">
                <div className="left">
                    <h2>Welcome to</h2>
                    <h1>Food & chill</h1>
                    <span>A place for you</span>
                </div>
                <div className="right">
                    <img
                        src="https://i.postimg.cc/5NQKJFvm/kisspng-greek-salad-fruit-salad-spinach-salad-muesli-vegetable-salad-5a96f429ce9af3-7299622115198423.png"
                        alt=""
                    />
                </div>
            </div>
        </div>
    );
};

export default HomeHero;