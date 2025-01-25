import React from "react";
import "../style.css";

function Header() {
    return (
        <div className="header">
            <div className="logo">CliniQ</div>
            <ul className="navbar">
                <li><a href="#services">Services</a></li>
                <li><a href="#about">About Us</a></li>
                <li><a href="#clinic-access">Access as clinic</a></li>
            </ul>     
        </div>
    )
}

export default Header;