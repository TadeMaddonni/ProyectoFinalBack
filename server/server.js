// importar express
const express = require("express");
const { Router } = express;
const cors = require("cors");
const path = require("path");
// Crear servidor
const app = express();
const productsRouter = Router();
const cartRouter = Router();
const contenedor = require("./clsae/contenedor");

// APP USES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ejecutar el servidor
const PORT = process.env.port || 8080;
app.listen(PORT, (req, res) => {
	console.log("Servidor desplegado en el puerto 8080");
});

productsRouter.get("/:id?", (req, res) => {
	const products = contenedor.getAllProducts();
	if (req.params.id != undefined) {
		const product = products.find(
			(el) => el.id === parseInt(req.params.id)
		);
		res.send(product);
	} else {
		res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
		res.set("Access-Control-Allow-Origin", "*");
		res.set("cache-control", "no-store");
		res.send({ products });
	}
	console.log(req.params);
});

productsRouter.post("/", (req, res) => {
	const admin = req.body.admin;
	if (admin) {
		const mensaje = contenedor.addProduct(req.body.product);
		res.send({ mensaje });
	} else {
		res.send({ error: "You need admin permissions to do this procedure" });
	}
});

productsRouter.put("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	const admin = req.body.admin;
	const product = req.body.product;
	if (admin && product) {
		const mensaje = contenedor.modifyProduct(id, product);
		res.send({ mensaje });
	} else {
		res.send({ error: "You need admin permissions to do this procedure" });
	}
});

productsRouter.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	console.log(id);
	const admin = req.body.admin;
	if (admin) {
		const mensaje = contenedor.deleteProduct(id);
		res.send({ mensaje });
	} else {
		res.send({ error: "You need admin permissions to do this procedure" });
	}
});

cartRouter.post("/", (req, res) => {
	const msg = contenedor.createCart();
	res.send(msg);
});

cartRouter.get("/:id/productos", (req, res) => {
	const id = parseInt(req.params.id);
	console.log(id);
	const products = contenedor.getCartItems(id);

	res.send({ products: products });
});

cartRouter.post("/:id/productos", (req, res) => {
	const id = parseInt(req.params.id);
	const product = req.body.product;
	console.log(id, product);
	const msg = contenedor.addCartItem(id, product);
	res.send({ msg });
});

cartRouter.delete("/:id/productos/:id_prod", (req, res) => {
	const id = parseInt(req.params.id);
	const prodId = parseInt(req.params.id_prod);
	console.log(id, prodId);
	const msg = contenedor.deleteCartItem(id, prodId);
	res.send({ msg });
});

cartRouter.delete("/:id", (req, res) => {
	const id = parseInt(req.params.id);
	console.log(id);
	contenedor.deleteCart(id);
});

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);
