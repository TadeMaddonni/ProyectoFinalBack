import { AppFirebase } from "../clsae/contenedorFirebase.js";

class ContenedorDAOFirebase extends AppFirebase {
    constructor(key, dbUrl) {
        super(key, dbUrl);
    }
}

export { ContenedorDAOFirebase };
