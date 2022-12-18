import mongoose from "mongoose";
import { CartModel } from "./databases/models/cartModel.js";
import { ProductModel } from "./databases/models/productModel.js";
import admin from "firebase-admin";
import { options } from "./config/databaseConfig.js";
let db;
let cartCollection;
let productCollection;
let batch;

/* const products = [
    {
        name: "Summer Asian Slaw",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 30,
        quantity: 1,
        img: "https://i.postimg.cc/4yq8tJCt/bowl1.png",
        stock: 27,
        timeStamp: "19/11/2022",
    },
    {
        name: "Salad ",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 24,
        quantity: 1,
        img: "https://i.postimg.cc/nh7W4QhL/bowl2.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "white sauce pasta",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 15,
        quantity: 1,
        img: "https://i.postimg.cc/KYPd236W/bowl3.png",
        stock: 50,
    },
    {
        name: "Butterfly pasta",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 16,
        quantity: 1,
        img: "https://i.postimg.cc/KYPd236W/bowl3.png",
        stock: 55,
    },
    {
        name: "Tooty fruity bowl",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 17,
        quantity: 1,
        img: "https://i.postimg.cc/sXf0C69B/fruits.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Granola cereal bowl",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 14,
        quantity: 1,
        img: "https://i.postimg.cc/Qdp69Gf9/granola-cereal-bowl.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Palm bowl",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 17,
        quantity: 1,
        img: "https://i.postimg.cc/SNn3KP0C/kisspng-aa-na-tigela-smoothie-aa-palm-bowl-apple-j-goji-berry-5b306ffe7baf07-9992682215299010545066.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Tigela smoothie",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 15,
        quantity: 1,
        img: "https://i.postimg.cc/3rtQNpk5/kisspng-aa-na-tigela-smoothie-breakfast-juice-health-s-acai-bowl-5b11d2604db908-66956303152789462431.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Breakfast cereal",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 24,
        quantity: 1,
        img: "https://i.postimg.cc/Sx0TxNfb/kisspng-breakfast-cereal-pizza-muesli-meze-vegetarian-cuis-granola-5ac48d852aeb69-189189231522830725.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Cuisine of hawaii",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 24,
        quantity: 1,
        img: "https://i.postimg.cc/cCHjw9vq/kisspng-cuisine-of-hawaii-l-l-hawaiian-barbecue-shrimp-gam-frozen-chicken-5b1e62f3a9e035-27662824152.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Fried chicken",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 24,
        quantity: 1,
        img: "https://i.postimg.cc/cCHjw9vq/kisspng-cuisine-of-hawaii-l-l-hawaiian-barbecue-shrimp-gam-frozen-chicken-5b1e62f3a9e035-27662824152.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Greek salad",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 16,
        quantity: 1,
        img: "https://i.postimg.cc/QCyzbQ7F/kisspng-fried-chicken-lemon-chicken-chicken-meat-fine-dining-chicken-meat-5a940a1b75aa22-82120543151.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Hamburger",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 18,
        quantity: 1,
        img: "https://i.postimg.cc/v8qCbsKG/kisspng-hamburger-street-food-seafood-fast-food-delicious-food-5a75083cceaf41-2676743415176192608466.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Israeli salad",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 20,
        quantity: 1,
        img: "https://i.postimg.cc/ZqHVHPtJ/kisspng-israeli-salad-european-cuisine.png",
        stock: 40,
        timeStamp: "19/11/2022",
    },
    {
        name: "Pizza Pasta",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 13,
        quantity: 1,
        img: "https://i.postimg.cc/mry6qfMf/kisspng-italian-cuisine-pizza-pasta-food-plate-healthy-food-5abb864701e2b7-3892346415222390470077.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Pizza",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 13,
        quantity: 1,
        img: "https://i.postimg.cc/R04gwsYP/pizza.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
    {
        name: "Mediterranean  Salad",
        info: "spicey with garlic and then deep fried to crispy perfection",
        price: 24,
        quantity: 1,
        img: "https://i.postimg.cc/x8xwZrwT/big-Burger.png",
        stock: 50,
        timeStamp: "19/11/2022",
    },
]; */

const ConnectToDatabase = async (key, dbUrl, cartId, itemId) => {
    admin.initializeApp({
        credential: admin.credential.cert(key),
        databaseURL: dbUrl,
    });
    db = admin.firestore();
    cartCollection = db.collection("carts");
    productCollection = db.collection("products");
    batch = db.batch();
    console.log("base de datos conectada");

    // Obtain cart
    const snapshot = await cartCollection.get();
    const docs = snapshot.docs;

    let carts = docs.map((doc) => {
        return {
            _id: doc.id,
            products: doc.data().products,
            timeStamp: doc.data().timeStamp,
        };
    });

    const clientCart = carts.find((cart) => cart._id == cartId);
    console.log(clientCart.products);
    return clientCart.products;
};

ConnectToDatabase(
    options.firebase.key,
    options.firebase.databaseURL,
    "6uFoMPC1If0fiFaoozgT",
    "21"
);

/*     const isOnCart = async (cartId, itemId) => {
            //Done
            const snapshot = await cartCollection.get();
            const docs = snapshot.docs;
    
            let carts = docs.map((doc) => {
                return {
                    _id: doc.id,
                    products: doc.data().products,
                    timeStamp: doc.data().timeStamp,
                };
            });
            const clientCartItems = carts.find(
                (cart) => cart._id == cartId
            )?.products;
    
            const isOnCart = clientCartItems.some((item) => item._id == itemId);
            return isOnCart;
        };
        //Add cart item
    
        console.log(cartId, product._id);
        if (await isOnCart(cartId, product._id)) {
            //Obtain cart
            const snapshot = await cartCollection.get();
            const docs = snapshot.docs;
    
            let carts = docs.map((doc) => {
                return {
                    _id: doc.id,
                    products: doc.data().products,
                    timeStamp: doc.data().timeStamp,
                };
            });
            let clientCartItems = carts.find(
                (cart) => cart._id == cartId
            )?.products;
    
            //Modify the quantity of the product selected
            clientCartItems = clientCartItems.map((el) => {
                if (el._id == product._id) {
                    return {
                        ...el,
                        quantity: el.quantity + product.quantity,
                    };
                } else {
                    return el;
                }
            });
    
            //Update the product on firebase
            try {
                const doc = cartCollection.doc(cartId);
                let result = await doc.update({
                    products: clientCartItems,
                });
                return "producto Agregado correctamente";
            } catch (error) {
                console.log("error" + error);
            }
        } else {
            // Obtain cart
            const snapshot = await cartCollection.get();
            const docs = snapshot.docs;
    
            let carts = docs.map((doc) => {
                return {
                    _id: doc.id,
                    products: doc.data().products,
                    timeStamp: doc.data().timeStamp,
                };
            });
    
            let clientCartItems = carts.find(
                (cart) => cart._id == cartId
            )?.products;
    
            //add the product selected
            clientCartItems.push(product);
            console.log(clientCartItems);
    
            //Update the cart products on firebase
            try {
                const doc = cartCollection.doc(cartId);
                let result = await doc.update({
                    products: clientCartItems,
                });
                return "Producto agregado correctamente";
            } catch (error) {
                console.log("error: " + error);
            }
        } */

/* let timeStamp = new Date().toLocaleString();
    
    const newCart = {
        timeStamp: timeStamp,
        products: [],
    };
    
    //  Agregar el cart a Firebase
    const doc = cartCollection.doc();
    let result = await doc.create(newCart);
    console.log(result);
    
    // Obtener el Id del carrito.
    const snapshot = await cartCollection.get();
    const docs = snapshot.docs;
    let carts = docs.map((doc) => {
        return {
            _id: doc.id,
            products: doc.data().products,
            timeStamp: doc.data().timeStamp,
        };
    });
    let newestCart = carts.find((cart) => cart.timeStamp === timeStamp);
    let newestCartId = newestCart._id; */

/*     const doc = productCollection.doc(); //Creamos instancia del documento con ID automatico.
    await doc.create({
        name: "Coca cola ",
        info: "Refreshing Coke",
        price: 5,
        quantity: 1,
        img: "https://i.postimg.cc/nh7W4QhL/bowl2.png",
        stock: 120,
        timeStamp: "17/12/2022",
    }); 
    console.log("Producto agregado correctamente."); */

/* const snapshot = await productCollection.get();
const docs = snapshot.docs;
let products = docs.map((doc) => {
    return {
        _id: doc.id,
        name: doc.data().name,
        info: doc.data().info,
        price: doc.data().price,
        quantity: doc.data().quantity,
        img: doc.data().img,
        stock: doc.data().stock,
        timeStamp: doc.data().timeStamp,
    };
});
console.log(products); */

/* products.forEach((doc) => {
    let docRef = productCollection.doc(); //automatically generate unique id
    batch.set(docRef, doc);
});
batch.commit();
"mongodb+srv://tade:tade1506@coderbase.1m86azc.mongodb.net/proyectoFinal?retryWrites=true&w=majority", */
/* mongoose.connect(
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    },
    (error) => {
        if (error) return console.log("hubo un error al conectarse");
        return console.log("conexion exitosa");
    }
);

// Funcion para saber si el producto esta en el carrito
const isOnCart = async (cartId, itemId) => {
    console.log(cartId, itemId);
    const clientCart = await CartModel.find({ _id: cartId });

    const clientCartItems = clientCart[0].products;
    console.log(clientCartItems);

    const isOnCart = clientCartItems.some((item) => item._id == itemId);
    return isOnCart;
};

const operaciones = async (cartId, itemId) => {
    console.log(cartId);
    await CartModel.deleteOne({ _id: cartId });
    return "Carrito borrado correctamente";
 */
/*     const clientCart = await CartModel.find({ _id: cartId });

    const clientCartItems = clientCart[0]?.products;

    console.log(clientCartItems);
    return clientCartItems; */

/*     const clientCart = await CartModel.find({ _id: cartId });
    let clientCartItems = clientCart[0]?.products;

    clientCartItems = clientCartItems.filter((item) => item._id !== itemId);

    await CartModel.updateOne(
        { _id: cartId },
        { $set: { products: clientCartItems } }
    ); */

/* isOnCart(cartId, product._id);
    if (await isOnCart(cartId, product._id)) {

        clientCartItems = clientCartItems.map((el) => {
            if (el._id == product._id) {
                return {
                    ...el,
                    quantity: el.quantity + product.quantity,
                };
            } else {
                return el;
            }
        });
        await CartModel.updateOne(
            { _id: cartId },
            { $set: { products: clientCartItems } }
        );

        return "producto Agregado correctamente";
    } else {
        const clientCart = await CartModel.find({
            _id: cartId,
        });
        let clientCartItems = clientCart[0]?.products;

        clientCartItems.push(product);
        console.log(clientCartItems);

        await CartModel.updateOne(
            { _id: cartId },
            { $set: { products: clientCartItems } }
        );
        return "Producto agregado correctamente";
    } }*/

/* const product = {
    _id: "18",
    name: "Mediterranean  Salad",
    info: "spicey with garlic and then deep fried to crispy perfection",
    price: 24,
    quantity: 2,
    img: "https://i.postimg.cc/x8xwZrwT/big-Burger.png",
    stock: 50,
    timeStamp: "19/11/2022",
};
operaciones("639ba11eec38b710d930aeed", "3");
 */
