import React from "react";
import "../style.css";

export function ClinicSignIn() {
    return (
        <div className="popup">
            <div className="request">Enter acces key:</div>
            <input type="text" className="clinicAccess" />
        </div>
    )
}