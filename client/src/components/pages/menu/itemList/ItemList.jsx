import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Item from "../item/Item";
import "./itemList.scss";

const ItemList = () => {
    const [menuData, setMenuData] = useState([]);
    console.log(menuData);
    useEffect(() => {
        fetch("http://localhost:8080/api/productos/")
            .then((res) => res.json())
            .then((data) => setMenuData(data.products));
    }, []);
    const menuItems = menuData.map((item) => {
        return (
            <Item
                key={item.id}
                id={item.id}
                name={item.name}
                img={item.img}
                price={item.price}
                info={item.info}
            />
        );
    });

    return (
        <div className="menuListContainer">
            <div className="menuList">{menuItems}</div>
        </div>
    );
};

export default ItemList;
