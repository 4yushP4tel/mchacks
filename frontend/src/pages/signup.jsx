import React, { useState } from 'react';
import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import './signup.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Signup( {setStatus} ) {

    const navigate = useNavigate();
    
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        password: '',
        age: ''
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

        try{
            const response = await axios.post("/api/create_patient", {
                patient_name: formData.fullName,
                email: formData.email,
                password: formData.password,
                age: formData.age
            }, {withCredentials: true})
    
            console.log(response.data)
    
            const stat = response.data.auth_status;
            setStatus(stat)
            navigate("/symptoms")

        } catch{
            alert("This user already exists");
        }


        
    }

    return (
        <>
            
            <div class="container">
                <Header />
                <div className="formcontainer">
                    
                </div>
                <form className="form1" onSubmit={signup}>
                    <div className="FullName">Full Name</div>
                    <input
                        type="text"
                        name="fullName"
                        id="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                    />
                    
                    <div className="Email">Email</div>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="youremail@email.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <div className="Password">Enter Password</div>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />

                    <div className="Age">Age</div>
                    <input
                        class="agewidth"
                        min={18}
                        max={130}
                        type="number"
                        name="age"
                        id="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                    />
                    <button type="submit">Sign Up</button>
                </form>

                <Link to = {"/signin"} className='signinlink'>Already have an account? Sign In</Link>

                <Footer />
            </div>
        </>
    );
}
