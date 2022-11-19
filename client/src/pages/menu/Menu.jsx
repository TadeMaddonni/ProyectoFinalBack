import React from "react";
import MenuHero from "../../components/pages/menu/hero/MenuHero";
import ItemList from "../../components/pages/menu/itemList/ItemList";
import "./menu.scss";

const Menu = () => {
    return (
        <div>
            <div>
                <MenuHero />

                <ItemList />
            </div>
        </div>
    );
};

export default Menu;
