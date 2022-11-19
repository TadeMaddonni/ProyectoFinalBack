import React from "react";
import { Link } from "react-router-dom";
import "./item.scss";

const Item = (props) => {
    return (
        <Link to={`/item/${props.id}`}>
            <div className="item">
                <img src={props.img} alt="" />
                <div className="itemHeadDescription">
                    <p className="headDescriptionName">{props.name}</p>
                    <p className="headDescriptionInfo">
                        <small>{props.info}</small>
                    </p>
                </div>
                <div className="itemFootDescription">
                    <span className="footDescriptionPrice">${props.price}</span>
                </div>
            </div>
        </Link>
    );
};

export default Item;
