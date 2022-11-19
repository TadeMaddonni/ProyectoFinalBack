import React from "react";
import "./footer.scss";

const Footer = () => {
    return (
        <div className="footerContainer">
            <footer className="footer">
                <span>All rights reserved @2022</span>
                <span>
                    by <span className="italic">Food & Chill</span>{" "}
                </span>
            </footer>
        </div>
    );
};

export default Footer;
