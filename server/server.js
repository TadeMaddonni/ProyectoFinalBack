import express from "express";
import cors from "cors";
import path from "path";
import { AppAchivos } from "./clsae/contenedor.js";
import cartRouter from "./managers/carritos.js";
import productsRouter from "./managers/productos.js";
import { AppMongo } from "./clsae/contenedorMongo.js";
const { Router } = express;

// Crear servidor
const app = express();

// APP USES
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ejecutar el servidor
const PORT = process.env.port || 8080;
app.listen(PORT, (req, res) => {
    console.log("Servidor desplegado en el puerto 8080");
});

app.use("/api/productos", productsRouter);
app.use("/api/carrito", cartRouter);

// importar express
/* const express = require("express");
const path = require("path");
const cors = require("cors");
 */
