import React from "react";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
    const handleDelete = (id) => {
        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                admin: true,
            }),
        })
            .then((res) => res.json())
            .then((data) => alert(data.mensaje));
    };

    return (
        <div className="item">
            <img src={props.img} alt="" />
            <div className="itemHeadDescription">
                <p className="headDescriptionName">{props.name}</p>
                <p className="headDescriptionInfo">
                    <small>{props.info}</small>
                </p>
                <small>Id: {props.id}</small>
            </div>
            <div className="itemFootDescription">
                <span className="footDescriptionPrice">${props.price}</span>
            </div>
            <div className="itemFootDescription">
                <Link to={`/modify/${props.id}`}>
                    <span className="adminBtn">Modify</span>
                </Link>
                <div
                    onClick={() => {
                        handleDelete(props.id);
                    }}
                >
                    <span className="adminBtn">Delete</span>
                </div>
            </div>
        </div>
    );
};

export default ProductItem;
