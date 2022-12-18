import { options } from "../config/databaseConfig.js";
let contenedor;

let databaseType = "mongodb";
//firebase, mongodb

switch (databaseType) {
    case "filesystem":
        const { ContenedorDAOArchivos } = await import(
            "./contenedorDAOArchivos.js"
        );
        contenedor = new ContenedorDAOArchivos();
        break;
    case "firebase":
        const { ContenedorDAOFirebase } = await import(
            "./contenedorDAOFirebase.js"
        );
        contenedor = new ContenedorDAOFirebase(
            options.firebase.key,
            options.firebase.databaseURL
        );
        break;
    case "mongodb":
        const { ContenedorDAOMongo } = await import("./contenedorDAOMongo.js");
        contenedor = new ContenedorDAOMongo(options.mongoDb.uri);
        break;
}
export { contenedor };
