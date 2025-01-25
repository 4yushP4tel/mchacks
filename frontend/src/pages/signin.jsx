import React, { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";

export default function Signin( {setStatus}) {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(event){
        const { name, value } = event.target;
        setFormData({[name]: value});
    }

    function signin(event){
        event.preventDefault();
        console.log("Login", formData);
    }

    return (
        <>
        <Header />
        <form onSubmit={signin}>
            <div className='Email'>Enter your email address.</div>
            <input
                type="email"
                name="email"
                id="email"
                placeholder="youremail@email.com"
                value={formData.email}
                onChange={handleChange}
            />
            <div className='Password'>Enter your password.</div>
            <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
                value={formData.password}
                onChange={handleChange}
            />
        </form>
        <Footer />
        </>
    )
}