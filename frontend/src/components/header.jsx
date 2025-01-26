import React from "react";
import "../style.css";
import { Link } from "react-router-dom";

function Header() {
    return (
        <div className="header">
            <div className="logo">
                <Link to={"/"} style={{ textDecoration: "none", color: "black"}}>
                    CliniQ
                </Link>

            </div>
            <ul className="navbar">
                <li>Services</li>
                <li>About Us </li>

                <li>
                    <Link to={"/clinic_access"}>
                    <a>Access as CliniQ</a>
                    </Link>
                </li>
            </ul>     
        </div>
    )
}

export default Header;