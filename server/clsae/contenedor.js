import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export class AppAchivos {
    readFile(archivo) {
        const result = JSON.parse(
            fs.readFileSync(__dirname + `/archivos/${archivo}.json`, "utf-8")
        );
        if (result) {
            return result;
        } else {
            return [];
        }
    }

    writeProducts() {
        fs.writeFileSync(
            __dirname + `/archivos/productos.json`,
            JSON.stringify(this.products, null, 2)
        );
    }

    writeCart() {
        fs.writeFileSync(
            __dirname + `/archivos/carritos.json`,
            JSON.stringify(this.carts, null, 2)
        );
    }

    constructor() {
        this.products = this.readFile("productos");
        this.carts = this.readFile("carritos");
    }

    getAllProducts() {
        return this.products;
    }
    getAllCarts() {
        return this.carts;
    }

    addProduct(product) {
        const itExists = this.products.some(
            (prod) => prod.name === product.name
        );
        if (!itExists) {
            if (
                product.name != "" &&
                product.price != "" &&
                product.thumbnail != ""
            ) {
                this.products.push({
                    ...product,
                    timeStamp: new Date().toLocaleDateString(),
                    _id:
                        this.products.length > 0
                            ? this.products[this.products.length - 1]._id + 1
                            : this.products.length + 1,
                });
                console.log(this.products);
                this.writeProducts();
                return "Product added correctly";
            } else {
                return "Wrong product";
            }
        } else {
            return "Product was already on the database";
        }
    }

    deleteProduct(id) {
        this.products = this.products.filter((prods) => prods._id !== id);
        this.writeProducts();
        return "Product deleted succesfully";
    }
    modifyProduct(id, prod) {
        const product = this.products.find((el) => el._id == id);
        if (product) {
            this.products = this.products.map((el) => {
                if (el._id == id) {
                    const item = {
                        _id: prod.id,
                        name: prod.name,
                        info: prod.info,
                        price: parseInt(prod.price),
                        quantity: prod.quantity,
                        img: prod.img,
                        stock: parseInt(prod.stock),
                    };
                    return item;
                } else {
                    return el;
                }
            });
            this.writeProducts();
            return "Product updated";
        } else {
            return "Product doesn't exist";
        }
    }

    deleteCart(id) {
        console.log(id);
        this.carts = this.carts.filter((cart) => cart._id != id);
        this.writeCart();
        return "Carrito borrado correctamente";
    }

    createCart() {
        const cartId =
            parseInt(this.carts[this.carts.length - 1]?._id) + 1 ||
            this.carts.length + 1;
        const newCart = {
            _id: `${cartId}`,
            timeStamp: Date.now().toLocaleString(),
            products: [],
        };
        this.carts.push(newCart);
        console.log(this.carts);
        this.writeCart();
        return { id: cartId };
    }

    isOnCart(cartId, itemId) {
        const clientCart = this.carts.find(
            (cart) => cart._id == cartId
        ).products;
        const item = clientCart.find((el) => el._id == itemId);
        console.log(item);
        return item ? true : false;
    }

    addCartItem(cartId, product) {
        console.log(product._id);
        if (this.isOnCart(cartId, product._id)) {
            console.log("Esta");
            this.carts = this.carts.map((cart) => {
                if (cart._id == cartId) {
                    const newProducts = cart.products.map((el) => {
                        if (el._id == product._id) {
                            return {
                                ...el,
                                quantity: el.quantity + product.quantity,
                            };
                        } else {
                            return el;
                        }
                    });
                    const newCart = { ...cart, products: newProducts };
                    console.log(newCart);
                    return newCart;
                } else {
                    return cart;
                }
            });
            this.writeCart();
            return "producto";
        } else {
            this.carts.map((cart) => {
                if (cart._id == cartId) {
                    const newProducts = cart.products.push(product);
                    console.log(newProducts);
                    const newCart = { ...cart, products: newProducts };
                    console.log(newCart);
                    return newCart;
                } else {
                    return cart;
                }
            });
            this.writeCart();
            return "Producto agregado correctamente";
        }
    }

    deleteCartItem(cartId, itemId) {
        console.log(itemId);
        this.carts = this.carts.map((cart) => {
            if (cart._id == cartId) {
                const newProducts = cart.products.filter(
                    (el) => el._id != itemId
                );
                const newCart = { ...cart, products: newProducts };
                console.log(newCart);
                return newCart;
            } else {
                return cart;
            }
        });
        console.log(this.carts);
        this.writeCart();
        return "Product deleted correctly";
    }

    getCartItems(id) {
        console.log(id);
        console.log(this.carts);
        const cart = this.carts.find((cart) => cart._id === id);
        console.log(cart);
        return cart.products;
    }
}

// export const contenedor = new AppAchivos();
