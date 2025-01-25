import React from "react";
import "./style.css";

function Footer() {
    return (
        <footer className="footer">
            <p>© {new Date().getFullYear()} CliniQ. All rights reserved.</p>
        </footer>
    )
}

export default Footer;