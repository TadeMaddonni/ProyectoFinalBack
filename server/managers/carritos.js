import express from "express";
import { AppAchivos } from "../clsae/contenedor.js";
import { AppFirebase } from "../clsae/contenedorFirebase.js";
import { AppMongo } from "../clsae/contenedorMongo.js";
import { options } from "../config/databaseConfig.js";
import { contenedor } from "../daos/index.js";
const { Router } = express;
const cartRouter = Router();

// const contenedor = new AppMongo(options.mongoDb.uri);
// const contenedor = new AppAchivos();
/* const contenedor = new AppFirebase(
    options.firebase.key,
    options.firebase.databaseURL
); */

cartRouter.post("/", async (req, res) => {
    const msg = await contenedor.createCart();
    res.send(msg);
});

cartRouter.get("/:id/productos", async (req, res) => {
    const id = req.params.id;
    console.log("id" + id);
    const products = await contenedor.getCartItems(id);

    res.send({ products: products });
});

cartRouter.post("/:id/productos", async (req, res) => {
    const id = req.params.id;
    const product = req.body.product;
    const msg = await contenedor.addCartItem(id, product);
    res.send({ msg });
});

cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    const id = req.params.id;
    const prodId = req.params.id_prod;
    console.log(id, prodId);
    const msg = await contenedor.deleteCartItem(id, prodId);
    res.send({ msg });
});

cartRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    await contenedor.deleteCart(id);
});

export default cartRouter;
