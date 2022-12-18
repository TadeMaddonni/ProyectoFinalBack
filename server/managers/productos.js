import express from "express";
import { AppAchivos } from "../clsae/contenedor.js";
import { AppFirebase } from "../clsae/contenedorFirebase.js";
import { AppMongo } from "../clsae/contenedorMongo.js";
const { Router } = express;
import { options } from "../config/databaseConfig.js";
import { contenedor } from "../daos/index.js";

// const contenedor = new AppMongo(options.mongoDb.uri);
//const contenedor = new AppAchivos();
/* const contenedor = new AppFirebase(
    options.firebase.key,
    options.firebase.databaseURL
); */
const productsRouter = Router();

productsRouter.get("/:id?", async (req, res) => {
    const products = await contenedor.getAllProducts();
    if (req.params.id != undefined) {
        const product = products.find((el) => el._id == req.params.id);
        res.send(product);
    } else {
        res.set("Access-Control-Allow-Origin", "http://127.0.0.1:5173");
        res.set("Access-Control-Allow-Origin", "*");
        res.set("cache-control", "no-store");
        res.send({ products });
    }
    console.log(req.params);
});

productsRouter.post("/", async (req, res) => {
    const admin = req.body.admin;
    if (admin) {
        const mensaje = await contenedor.addProduct(req.body.product);
        res.send({ mensaje });
    } else {
        res.send({ error: "You need admin permissions to do this procedure" });
    }
});

productsRouter.put("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(id);
    const admin = req.body.admin;
    const product = req.body.product;
    if (admin && product) {
        const mensaje = await contenedor.modifyProduct(id, product);
        res.send({ mensaje });
    } else {
        res.send({ error: "You need admin permissions to do this procedure" });
    }
});

productsRouter.delete("/:id", async (req, res) => {
    const id = req.params.id;
    console.log(typeof id);
    const admin = req.body.admin;
    if (admin) {
        const mensaje = await contenedor.deleteProduct(id);
        res.send({ mensaje });
    } else {
        res.send({ error: "You need admin permissions to do this procedure" });
    }
});

export default productsRouter;
