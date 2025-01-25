import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="logo">CliniQ</div>
            <ul className="navbar">
                <li>Services</li>
                <li>About Us </li>

                <li>
                    <Link to={"/clinic_access"}>
                    <a>Access as clinic</a>
                    </Link>
                </li>
            </ul>     
        </div>
    )
}

export default Header;