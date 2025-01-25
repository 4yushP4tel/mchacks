import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="logo">CliniQ</div>
            <ul className="navbar">
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About Us</a></li>
                <Link to={"/clinic_access"}>
                   <li>Access as clinic</li>
                </Link>
            </ul>     
        </div>
    )
}

export default Header;