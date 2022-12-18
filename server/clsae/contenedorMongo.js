import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import mongoose from "mongoose";
import { ProductModel } from "../databases/models/productModel.js";
import { CartModel } from "../databases/models/cartModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class AppMongo {
    connectToDatabase(url) {
        mongoose.connect(
            url,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            },
            (error) => {
                if (error) return console.log("hubo un error al conectarse");
                return console.log("conexion exitosa");
            }
        );
    }
    constructor(url) {
        this.url = url;
        this.connected = this.connectToDatabase(url);
    }

    async getAllProducts() {
        const products = await ProductModel.find();
        return products;
    }
    async getAllCarts() {
        const carts = await CartModel.find();
        return carts;
    }

    async addProduct(prod) {
        console.log(prod.name);
        const itExists = await ProductModel.findOne({ name: prod.name });
        console.log(itExists);
        if (!itExists) {
            if (prod.name != "" && prod.price != "" && prod.thumbnail != "") {
                const product = {
                    ...prod,
                    timeStamp: new Date().toLocaleDateString(),
                };
                ProductModel.create(product);
                return "Product added correctly";
            } else {
                return "Wrong product";
            }
        } else {
            return "Product was already on the database";
        }
    }

    async deleteProduct(id) {
        await ProductModel.deleteOne({ _id: id });
        return "Product deleted succesfully";
    }

    async modifyProduct(id, prod) {
        const product = await ProductModel.findOne({ _id: id });
        console.log(id);
        if (product) {
            const newPrice = parseInt(prod.price);
            const newStock = parseInt(prod.stock);

            try {
                await ProductModel.updateOne(
                    { _id: id },
                    {
                        $set: {
                            name: prod.name,
                            info: prod.info,
                            price: newPrice,
                            quantity: prod.quantity,
                            img: prod.img,
                            stock: newStock,
                        },
                    }
                );
                return "Product updated";
            } catch (error) {
                console.log(error);
                return "Ha ocurrido un error";
            }
        } else {
            return "Product doesn't exist";
        }
    }

    async deleteCart(cartId) {
        console.log(cartId);
        await CartModel.deleteOne({ _id: cartId });
        return "Carrito borrado correctamente";
    }

    async createCart() {
        // Crear el carrito
        const newCart = {
            timeStamp: new Date().toLocaleString(),
            products: [],
        };

        // Agregar el cart a la Base de Datos.
        await CartModel.create(newCart);

        // Obtener el Id del carrito.
        const carts = await CartModel.find({});

        const newestCart = carts[carts.length - 1];

        const newestCartId = newestCart._id.valueOf();

        console.log("id:" + newestCartId);
        return { id: newestCartId };
    }

    async isOnCart(cartId, itemId) {
        console.log(cartId, itemId);
        const clientCart = await CartModel.find({ _id: cartId });

        const clientCartItems = clientCart[0].products;
        console.log(clientCartItems);

        const isOnCart = clientCartItems.some((item) => item._id == itemId);
        return isOnCart;
    }

    async addCartItem(cartId, product) {
        console.log(cartId, product._id);
        if (await this.isOnCart(cartId, product._id)) {
            const clientCart = await CartModel.find({ _id: cartId });
            let clientCartItems = clientCart[0]?.products;

            clientCartItems = clientCartItems.map((el) => {
                if (el._id == product._id) {
                    return {
                        ...el,
                        quantity: el.quantity + product.quantity,
                    };
                } else {
                    return el;
                }
            });

            await CartModel.updateOne(
                { _id: cartId },
                { $set: { products: clientCartItems } }
            );

            return "producto Agregado correctamente";
        } else {
            const clientCart = await CartModel.find({
                _id: cartId,
            });
            let clientCartItems = clientCart[0]?.products;

            clientCartItems.push(product);
            console.log(clientCartItems);

            await CartModel.updateOne(
                { _id: cartId },
                { $set: { products: clientCartItems } }
            );
            return "Producto agregado correctamente";
        }
    }

    async deleteCartItem(cartId, itemId) {
        const clientCart = await CartModel.find({ _id: cartId });
        let clientCartItems = clientCart[0]?.products;

        clientCartItems = clientCartItems.filter((item) => item._id !== itemId);

        await CartModel.updateOne(
            { _id: cartId },
            { $set: { products: clientCartItems } }
        );
        return "Product deleted correctly.";
    }

    async getCartItems(cartId) {
        const clientCart = await CartModel.find({ _id: cartId });

        const clientCartItems = clientCart[0]?.products;

        console.log(clientCartItems);
        return clientCartItems;
    }
}
