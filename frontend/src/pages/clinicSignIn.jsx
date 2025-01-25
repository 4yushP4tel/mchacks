import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../style.css";

export function ClinicSignIn() {
    return (
        <div className="app-container">
            <Header />
            <div className="popup">
                <div className="request">Enter acces key:</div>
                <input type="text" className="clinicAccess" />
                <button className="clinicAccessButton">Access</button>
            </div>
            <Footer />
        </div>
    )
}

