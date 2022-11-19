import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditItemFomr from "../../components/pages/admin/editItemForm/EditItemFomr";
import "./modifyProduct.scss";

const ModifyProduct = () => {
    const { id } = useParams();
    const [item, setItem] = useState([]);
    console.log(item);
    useEffect(() => {
        fetch("http://localhost:8080/api/productos/")
            .then((res) => res.json())
            .then((data) =>
                setItem(data.products.find((el) => el.id === parseInt(id)))
            );
    }, []);
    return (
        <div className="modifyContainer">
            <div className="modify">
                <h1>Modify Product</h1>

                <EditItemFomr item={item} />
            </div>
        </div>
    );
};

export default ModifyProduct;
