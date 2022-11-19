const fs = require("fs");

class App {
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
					id:
						this.products.length > 0
							? this.products[this.products.length - 1].id + 1
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
		this.products = this.products.filter((prods) => prods.id !== id);
		this.writeProducts();
		return "Product deleted succesfully";
	}
	modifyProduct(id, prod) {
		const product = this.products.find((el) => el.id === id);
		if (product) {
			this.products = this.products.map((el) => {
				if (el.id === id) {
					const item = {
						id: prod.id,
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
		this.carts = this.carts.filter((cart) => cart.id !== id);
		this.writeCart();
		return "Carrito borrado correctamente";
	}

	createCart() {
		const cartId =
			this.carts[this.carts.length - 1]?.id + 1 || this.carts.length + 1;
		const newCart = {
			id: cartId,
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
			(cart) => cart.id === cartId
		).products;
		const item = clientCart.find((el) => el.id === itemId);
		return item ? true : false;
	}

	addCartItem(cartId, product) {
		if (this.isOnCart(cartId, product.id)) {
			console.log("Esta");
			this.carts = this.carts.map((cart) => {
				if (cart.id === cartId) {
					const newProducts = cart.products.map((el) => {
						if (el.id === product.id) {
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
				if (cart.id === cartId) {
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
		console.log("Agregando Producto");
	}

	deleteCartItem(cartId, itemId) {
		this.carts = this.carts.map((cart) => {
			if (cart.id === cartId) {
				const newProducts = cart.products.filter(
					(el) => el.id != itemId
				);
				const newCart = { ...cart, products: newProducts };
				console.log(newCart);
				return newCart;
			} else {
				return cart;
			}
		});
		this.writeCart();
		return "Product deleted correctly";
	}

	getCartItems(id) {
		const cart = this.carts.find((cart) => cart.id === id)?.products;
		console.log(cart);
		return cart;
	}
}

const contenedor = new App();
module.exports = contenedor;
