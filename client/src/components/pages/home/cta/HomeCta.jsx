import React from "react";
import "./homeCta.scss";
import ctaIcon from "./ctaIcon";
import CtaButton from "./ctaIcon";
import { Link } from "react-router-dom";

const HomeCta = () => {
    return (
        <Link to="/menu">
            <div className="homeCtaContainer">
                <div className="homeCta">
                    <h3>Are you hungry?</h3>
                    <CtaButton />
                </div>
            </div>
        </Link>
    );
};

export default HomeCta;
