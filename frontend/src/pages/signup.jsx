import React, { useState } from 'react';
import './signup.css';
import axios from 'axios';

export default function Signup( {setStatus} ) {
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        age: '',
    });

    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    
    async function signup(event) {
        event.preventDefault();
        console.log("Form submitted", formData);

        const response = await axios.post("/api/create_patient", {
            patient_name: formData.fullName,
            email: formData.email,
            password: formData.password,
            age: formData.age
        }, {withCredentials: true})

        console.log(response)
        
    }

    return (
        <>
            <form onSubmit={signup}>
                <div className="FullName">Enter your full name.</div>
                <input
                    type="text"
                    name="fullName"
                    id="fullName"
                    placeholder="Full Name"
                    value={formData.fullName}
                    onChange={handleChange}
                />
                
                <div className="Email">Enter your email.</div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="youremail@email.com"
                    value={formData.email}
                    onChange={handleChange}
                />

                <div className="Password">Enter your password.</div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="password"
                    value={formData.password}
                    onChange={handleChange}
                />

                <div className="Age">Age</div>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={formData.age}
                    onChange={handleChange}
                />
                
                
                <button type="submit">Sign Up</button>
            </form>
        </>
    );
}
