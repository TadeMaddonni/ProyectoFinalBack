import React from "react";
import AddProductForm from "../../components/pages/admin/AddProductForm/AddProductForm";
import ProductList from "../../components/pages/admin/productList/ProductList";
import "./admin.scss";
const Admin = () => {
    return (
        <div className="adminContainer">
            <div className="admin">
                <h1>Admin View</h1>
                <ProductList />
                <h2>Add a Product</h2>
                <AddProductForm />
            </div>
        </div>
    );
};

export default Admin;
