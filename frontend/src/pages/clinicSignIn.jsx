import React from "react";
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import { useState } from "react";
import "../style.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function ClinicSignIn({setClinic_access}) {
    const [key, setKey] = useState("")
    const navigate = useNavigate()

    const handleaccess = async (e)=>{

        try{
            e.preventDefault()
            const response = await axios.post("/api/clinic_access", {
                entered_key: key
            }, {withCreditals: true});
    
            const access_grant = response.data.access_grant;
            setClinic_access(access_grant)
            
            navigate("/clinic")

        }catch{
            alert("Wrong Access Code! Only professionals from CliniQ can access this part of the app.")

        }

    }

    return (
        <div className="app-container">
            <Header />
            <div className="popup">
                <form onSubmit={handleaccess}>
                    <div className="request">Enter acces key:</div>
                    <input
                        type="text"
                        className="clinicAccess"
                        value={key}
                        onChange={(e) => setKey(e.target.value)}
                        required
                        />
                    <button className="clinicAccessButton">Access</button>
                </form>

            </div>
            <Footer />
        </div>
    )
}

