import React, { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import '../style.css';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Signin({ setStatus }) {

    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    })

    function handleChange(event) {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    async function handleSignIn(event) {
        event.preventDefault();
        console.log("Login", formData);

        try {
            const response = await axios.post("/api/login", {
                email: formData.email,
                password: formData.password
            }, { withCredentials: true });

            console.log(response.data);
            const stat = response.data.auth_status;
            setStatus(stat)


            navigate('/symptoms');

        } catch (e) {
            alert("Incorrect username and password combo")
            console.log(e);
        }
    }

    return (
        <div className="app-container">
            <Header />
            <div className="signInContainer">
            <form onSubmit={handleSignIn}>
                <div className='Email'>Email</div>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="youremail@email.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <div className='Password'>Password</div>
                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                <button type='submit'>Sign In</button>
            </form>

            <Link to={"/signup"}>Don't have an account? Sign Up</Link>

            <Footer />
            </div>
        </div>
    );
}