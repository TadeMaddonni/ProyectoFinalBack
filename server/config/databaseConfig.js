import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const firebaseServiceAccount = JSON.parse(
    fs.readFileSync(__dirname + "/firebaseConfig/firebaseKey.json")
);

//console.log(firebaseServiceAccount);

export const options = {
    fileSystem: {
        pathProducts: "productos.json",
        pathCarts: "carts.json",
    },
    mongoDb: {
        uri: "mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/proyectoFinal?retryWrites=true&w=majority",
    },
    firebase: {
        key: firebaseServiceAccount,
        databaseURL: "https://coderprueba-2313a.firebase.io",
    },
};
