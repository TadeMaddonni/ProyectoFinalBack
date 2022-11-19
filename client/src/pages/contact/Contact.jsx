import React from "react";
import Form from "../../components/pages/contact/form/Form";
import ContactHero from "../../components/pages/contact/hero/ContactHero";
import "./contact.scss";
const Contact = () => {
    return (
        <div className="contact">
            <ContactHero /> 
            <Form />
        </div>
    );
};

export default Contact;
