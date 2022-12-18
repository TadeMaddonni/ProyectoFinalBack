import mongoose from "mongoose";

// crear la coneccion donde almacenaremos la información
const productCollection = "products";

// Crear el esquema de cada documento
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    info: { type: String, required: true },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    img: { type: String, required: true },
    stock: { type: Number, required: true },
    timeStamp: { type: String, required: true },
});

// Crear el modelo
export const ProductModel = mongoose.model(productCollection, productSchema);
