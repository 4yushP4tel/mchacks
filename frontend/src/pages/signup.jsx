import React, { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import './signup.css';

export default function Signup() {
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        age: '',
    });

    
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({[name]: value});
    }

    
    function signup(event) {
        event.preventDefault();
        console.log("Form submitted", formData);
        
    }

    return (
        <>
            <Header/>
            <div class="container">
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
                        type="text"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                    />
                    
                    
                    <button type="submit">Sign Up</button>
                </form>
                
            </div>
            <Footer/>
        </>
    );
}
