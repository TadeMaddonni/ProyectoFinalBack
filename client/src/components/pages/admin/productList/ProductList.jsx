import React, { useEffect, useState } from "react";
import ProductItem from "./productItem/ProductItem";
import "./productList.scss";
const ProductList = () => {
    const [menuData, setMenuData] = useState([]);
    console.log(menuData);
    useEffect(() => {
        fetch("http://localhost:8080/api/productos/")
            .then((res) => res.json())
            .then((data) => setMenuData(data.products));
    }, []);
    const menuItems = menuData.map((item) => {
        return (
            <ProductItem
                key={item.id}
                id={item._id}
                name={item.name}
                img={item.img}
                price={item.price}
                info={item.info}
            />
        );
    });

    return (
        <div className="container">
            <div className="productListContainer">{menuItems}</div>
        </div>
    );
};

export default ProductList;
