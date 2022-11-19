import React from "react";
import { useState } from "react";
import "./addProductForm.scss";
const AddProductForm = () => {
    const [addedItem, setAddedItem] = useState({
        name: "",
        info: "",
        price: 0,
        quantity: 1,
        img: "",
        stock: 0,
    });
    console.log(addedItem);
    const handleOnChange = (e) => {
        setAddedItem((prevItem) => {
            const { name, value } = e.target;
            return {
                ...prevItem,
                [name]: value,
            };
        });
    };

    const addItem = (item) => {
        fetch(`http://localhost:8080/api/productos/`, {
            method: "POST",
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

        if (!isNaN(addedItem.price) && addedItem.price != 0) {
            precioValido = true;
        }

        if (!isNaN(addedItem.stock && addedItem.stock != undefined)) {
            stockValido = true;
        }
        if (addedItem.name !== "") {
            nameValido = true;
        }

        if (addedItem.info !== "") {
            infoValida = true;
        }
        if (addedItem.img !== "") {
            imgValida = true;
        }

        if (
            precioValido &&
            stockValido &&
            nameValido &&
            imgValida &&
            infoValida
        ) {
            console.log(addedItem);
            addItem(addedItem);
        } else {
            alert("Alguno de los datos ingresados no son validos");
        }
    };
    return (
        <div>
            <div>
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
                                    Add product
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddProductForm;
