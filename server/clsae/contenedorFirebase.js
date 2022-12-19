import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import admin from "firebase-admin";
import { time } from "console";
import { options } from "../config/databaseConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export class AppFirebase {
    connectToDatabase(key, dbUrl) {
        admin.initializeApp({
            credential: admin.credential.cert(key),
            databaseURL: dbUrl,
        });
        console.log("Base de datos conectada");
    }
    constructor(key, dbUrl) {
        this.connected = this.connectToDatabase(key, dbUrl);
        this.db = admin.firestore();
        this.cartCollection = this.db.collection("carts");
        this.productCollection = this.db.collection("products");
    }

    async getAllProducts() {
        //Done
        const snapshot = await this.productCollection.get();
        const docs = snapshot.docs;
        let products = docs.map((doc) => {
            return {
                _id: doc.id,
                name: doc.data().name,
                info: doc.data().info,
                price: doc.data().price,
                quantity: doc.data().quantity,
                img: doc.data().img,
                stock: doc.data().stock,
                timeStamp: doc.data().timeStamp,
            };
        });
        console.log(products);
        return products;
    }
    async getAllCarts() {
        //Done
        const snapshot = await this.cartCollection.get();
        const docs = snapshot.docs;
        let carts = docs.map((doc) => {
            return {
                _id: doc.id,
                timeStamp: doc.timeStamp,
                products: doc.products,
            };
        });
        console.log(carts);
        return carts;
    }

    async addProduct(prod) {
        //Done

        const snapshot = await this.productCollection.get();
        const docs = snapshot.docs;
        let products = docs.map((doc) => {
            return {
                _id: doc.id,
                name: doc.data().name,
                info: doc.data().info,
                price: doc.data().price,
                quantity: doc.data().quantity,
                img: doc.data().img,
                stock: doc.data().stock,
                timeStamp: doc.data().timeStamp,
            };
        });

        if (!products.some((item) => item.name === prod.name)) {
            if (prod.name != "" && prod.price != "" && prod.thumbnail != "") {
                const product = {
                    ...prod,
                    timeStamp: new Date().toLocaleDateString(),
                };
                // add it to firebase
                const doc = this.productCollection.doc();
                await doc.create(product);
                console.log("Product added correctly");
                return "Product added correctly";
            }
        } else {
            console.log("Product was already on the database");
            return "Product was already on the database";
        }
    }

    async deleteProduct(id) {
        //Done
        const doc = this.productCollection.doc(id);
        let result = await doc.delete();

        console.log("El producto ha sido eliminado correctamente");
        return "Product deleted succesfully";
    }

    async modifyProduct(id, prod) {
        //Done
        const products = await this.getAllProducts();
        const product = products.some((item) => item._id == id);
        console.log(product);
        if (product) {
            const newPrice = parseInt(prod.price);
            const newStock = parseInt(prod.stock);

            try {
                const doc = this.productCollection.doc(id);
                let result = await doc.update({
                    name: prod.name,
                    info: prod.info,
                    price: newPrice,
                    quantity: prod.quantity,
                    img: prod.img,
                    stock: newStock,
                });
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
        //Done
        const doc = this.cartCollection.doc(cartId);
        let result = await doc.delete();
        return "Carrito borrado correctamente";
    }

    async createCart() {
        // Done
        let timeStamp = new Date().toLocaleString();

        const newCart = {
            timeStamp: timeStamp,
            products: [],
        };

        //  Add the cart to firebase
        const doc = this.cartCollection.doc();
        await doc.create(newCart);

        // Obtain all carts from the carts collection
        const snapshot = await this.cartCollection.get();
        const docs = snapshot.docs;

        let carts = docs.map((doc) => {
            return {
                _id: doc.id,
                products: doc.data().products,
                timeStamp: doc.data().timeStamp,
            };
        });

        //Find the correct cart through the creation timestamp.
        const newestCart = carts.find((cart) => cart.timeStamp === timeStamp);
        const newestCartId = newestCart?._id;

        console.log(newestCartId);
        return { id: newestCartId };
    }

    async isOnCart(cartId, itemId) {
        //Done
        const snapshot = await this.cartCollection.get();
        const docs = snapshot.docs;

        let carts = docs.map((doc) => {
            return {
                _id: doc.id,
                products: doc.data().products,
                timeStamp: doc.data().timeStamp,
            };
        });
        const clientCartItems = carts.find(
            (cart) => cart._id == cartId
        )?.products;

        const isOnCart = clientCartItems.some((item) => item._id == itemId);
        return isOnCart;
    }

    async addCartItem(cartId, product) {
        //Done
        console.log(cartId, product._id);
        if (await this.isOnCart(cartId, product._id)) {
            //Obtain cart
            const snapshot = await this.cartCollection.get();
            const docs = snapshot.docs;

            let carts = docs.map((doc) => {
                return {
                    _id: doc.id,
                    products: doc.data().products,
                    timeStamp: doc.data().timeStamp,
                };
            });
            let clientCartItems = carts.find(
                (cart) => cart._id == cartId
            )?.products;

            //Modify the quantity of the product selected
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

            //Update the product on firebase
            try {
                const doc = this.cartCollection.doc(cartId);
                let result = await doc.update({ products: clientCartItems });
                return "producto Agregado correctamente";
            } catch (error) {
                console.log("error" + error);
            }
        } else {
            // Obtain cart
            const snapshot = await this.cartCollection.get();
            const docs = snapshot.docs;

            let carts = docs.map((doc) => {
                return {
                    _id: doc.id,
                    products: doc.data().products,
                    timeStamp: doc.data().timeStamp,
                };
            });

            let clientCartItems = carts.find(
                (cart) => cart._id == cartId
            )?.products;

            //add the product selected
            clientCartItems.push(product);
            console.log(clientCartItems);

            //Update the cart products on firebase
            try {
                const doc = this.cartCollection.doc(cartId);
                let result = await doc.update({ products: clientCartItems });
                return "Producto agregado correctamente";
            } catch (error) {
                console.log("error: " + error);
            }
        }
    }

    async deleteCartItem(cartId, itemId) {
        //Done
        // Obtain cart
        const snapshot = await this.cartCollection.get();
        const docs = snapshot.docs;

        let carts = docs.map((doc) => {
            return {
                _id: doc.id,
                products: doc.data().products,
                timeStamp: doc.data().timeStamp,
            };
        });

        let clientCartItems = carts.find(
            (cart) => cart._id == cartId
        )?.products;

        //Delete the product selected
        clientCartItems = clientCartItems.filter((item) => item._id !== itemId);

        //Update the cart products
        try {
            const doc = this.cartCollection.doc(cartId);
            let result = await doc.update({ products: clientCartItems });

            return "Product deleted correctly.";
        } catch (error) {
            console.log("error: " + error);
        }
    }

    async getCartItems(cartId) {
        //Done
        // Obtain cart
        const snapshot = await this.cartCollection.get();
        const docs = snapshot.docs;

        let carts = docs.map((doc) => {
            return {
                _id: doc.id,
                products: doc.data().products,
                timeStamp: doc.data().timeStamp,
            };
        });

        let clientCartItems = carts.find(
            (cart) => cart._id == cartId
        )?.products;

        return clientCartItems;
    }
}
