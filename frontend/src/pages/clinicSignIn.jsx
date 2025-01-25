import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import "../style.css";

export function ClinicSignIn() {
    const handleaccess = async (e) =>{
        e.preventDafault()
        const response = await axios.post("/api/clinic_access", {withcredential: true});

        stat = response.data.auth_grant
        

    }
    return (
        <div className="app-container">
            <Header />
            <div className="popup">
                <form onSubmit={handleaccess}>
                    <div className="request">Enter acces key:</div>
                    <input type="text" className="clinicAccess" />
                    <button className="clinicAccessButton">Access</button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

