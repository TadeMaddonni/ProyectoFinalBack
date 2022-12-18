import { AppMongo } from "../clsae/contenedorMongo.js";

class ContenedorDAOMongo extends AppMongo {
    constructor(url) {
        super(url);
    }
}

export { ContenedorDAOMongo };
