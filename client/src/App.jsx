import "./app.scss";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Footer from "./components/common/footer/Footer";
import Topbar from "./components/common/topbar/Topbar";
import Home from "./pages/home/Home";
import Contact from "./pages/contact/Contact";
import Menu from "./pages/menu/Menu";
import Cart from "./pages/cart/Cart";
import CartContextProvider from "./context/cartContext/CartContext";
import ItemDetail from "./pages/itemDetail/ItemDetail";
import Admin from "./pages/admin/Admin";
import ModifyProduct from "./pages/modifyProduct/modifyProduct";

function App() {
    return (
        <CartContextProvider>
            <BrowserRouter>
                <Topbar />
                <Routes>
                    <Route index element={<Home />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/item/:id" element={<ItemDetail />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route
                        path="/modify/:id"
                        element={<ModifyProduct />}
                    ></Route>
                </Routes>
                <Footer />
            </BrowserRouter>
        </CartContextProvider>
    );
}

export default App;
