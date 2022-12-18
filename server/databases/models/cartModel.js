import mongoose from "mongoose";

// crear la coneccion donde almacenaremos la información
const cartCollection = "carts";

// Crear el esquema de cada documento
const cartSchema = new mongoose.Schema({
    timeStamp: { type: String, required: true },
    products: { type: Array, required: true },
});

// Crear el modelo
export const CartModel = mongoose.model(cartCollection, cartSchema);
