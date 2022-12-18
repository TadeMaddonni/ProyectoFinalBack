import React from "react";
import { useState } from "react";
import "./editForm.scss";
const EditItemFomr = ({ item }) => {
    console.log(item);
    const [modifiedItem, setModifiedItem] = useState({
        id: item._id,
        name: item.name,
        info: item.info,
        price: item.price,
        quantity: item.quantity,
        img: item.img,
        stock: item.stock,
    });
    console.log(modifiedItem);
    const handleOnChange = (e) => {
        setModifiedItem((prevItem) => {
            const { name, value } = e.target;
            return {
                ...prevItem,
                [name]: value,
            };
        });
    };

    const modifyItem = (id, item) => {
        fetch(`http://localhost:8080/api/productos/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                admin: true,
                product: item,
            }),
        })
            .then((res) => res.json())
            .then((res) => alert(res.mensaje));
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        let precioValido = false;
        let stockValido = false;
        let nameValido = false;
        let imgValida = false;
        let infoValida = false;

        if (!isNaN(modifiedItem.price) && modifiedItem.price != undefined) {
            precioValido = true;
        }

        if (!isNaN(modifiedItem.stock && modifiedItem.stock != undefined)) {
            stockValido = true;
        }
        if (modifiedItem.name !== undefined) {
            nameValido = true;
        }

        if (modifiedItem.info !== undefined) {
            infoValida = true;
        }
        if (modifiedItem.img !== undefined) {
            imgValida = true;
        }
        if (modifiedItem.name !== undefined) {
            nameValido = true;
        }

        if (
            precioValido &&
            stockValido &&
            nameValido &&
            imgValida &&
            infoValida
        ) {
            const finalItem = {
                ...modifiedItem,
                id: item._id,
                quantity: item.quantity,
            };
            console.log(finalItem);
            modifyItem(item._id, finalItem);
        } else {
            alert("Alguno de los datos ingresados no son validos");
        }
    };
    return (
        <div>
            <div>
                <div className="dataContainer">
                    <h3>Previous data</h3>
                    <div className="data">
                        <span className="dataC">
                            ID: <span className="info">{item._id}</span>
                        </span>
                        <span className="dataC">
                            Name: <span className="info">{item.name}</span>
                        </span>
                        <span className="dataC">
                            Price: <span className="info">{item.price}</span>
                        </span>
                        <span className="dataC">
                            Stock: <span className="info">{item.stock}</span>
                        </span>
                        <span className="dataC">
                            Img: <span className="info">{item.img}</span>
                        </span>
                        <span className="dataC">
                            Info: <span className="info">{item.info}</span>
                        </span>
                    </div>
                </div>
                <div className="contactFormContainer">
                    <div className="contactForm">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="inputContainer">
                                <label htmlFor="name">
                                    Name:
                                    <input
                                        onChange={handleOnChange}
                                        type="text"
                                        name="name"
                                        placeholder="Enter the product name"
                                    />
                                </label>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="price">
                                    Price:
                                    <input
                                        onChange={handleOnChange}
                                        type="number"
                                        name="price"
                                        placeholder="Enter the product price"
                                    />
                                </label>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="img">
                                    Image:
                                    <input
                                        onChange={handleOnChange}
                                        type="text"
                                        name="img"
                                        placeholder="Enter the product Thumbnail"
                                    />
                                </label>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="stock">
                                    Stock:
                                    <input
                                        onChange={handleOnChange}
                                        type="number"
                                        name="stock"
                                        placeholder="Enter the product stock"
                                    />
                                </label>
                            </div>
                            <div className="inputContainer">
                                <label htmlFor="info">
                                    Info:
                                    <input
                                        onChange={handleOnChange}
                                        type="text"
                                        name="info"
                                        placeholder="Enter the product info"
                                    />
                                </label>
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    className="contactFormBtn"
                                >
                                    Update
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditItemFomr;
