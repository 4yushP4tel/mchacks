import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../style.css";

export function ClinicSignIn() {
    return (
        <div>
            <Header />
            <div className="popup">
                <div className="request">Enter acces key:</div>
                <input type="text" className="clinicAccess" />
            </div>
            <Footer />
        </div>
    )
}

