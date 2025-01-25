<<<<<<< HEAD
import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'
import Admitted from './pages/Admitted';
=======
import React from "react";
import Header from "./components/header.jsx";
import Homepage from "./pages/homepage.jsx";
import Footer from "./components/footer.jsx";
import Signup from "./pages/signup.jsx";
import { Signin } from "./pages/signin.jsx";
import {ClinicSignIn} from "./components/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./style.css";
>>>>>>> d53f3b60e0f7028f9578d9f40fdacf621082f13e

function App() {
  return (
<<<<<<< HEAD
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/clinic_access" element={<ClinicSignIn/>}></Route>
      </Routes>
    </Router>
=======
<<<<<<< HEAD
    <Admitted/>
    // <Router>
    //   <Routes>
    //     <Route path='/signin' element={<Signin/>}></Route>
    //     <Route path='/home' element={<Home/>}></Route>
    //     <Route path='/patients_welcome' element={<Patients_welcome/>}></Route>
    //     <Route path='/clinic_welcome' element={<Clinic_welcome/>}></Route>
    //   </Routes>
    // </Router>
=======
    <div className="app-container">
      <Header />
>>>>>>> d53f3b60e0f7028f9578d9f40fdacf621082f13e

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to CliniQ</h1>
          <p>Your health, our priority. Consult with top doctors from the comfort of your home.</p>
          <button className="cta-button">Start Today</button>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Virtual Consultations</li>
            <li>Online Reservations</li>
            <li>Health Checkups</li>
            <li>Mental Health Support</li>
          </ul>
        </section>

        <section id="about" className="about-us">
          <h2>About Us</h2>
          <p>
            We are a dedicated team of medical professionals bringing healthcare to your doorstep.
            With advanced technology and personalized care, we make your health journey seamless.
          </p>
        </section>
      </main>

      <Footer />
    </div>
>>>>>>> b4e0b0a96ccc9e06534b592b7f9085dcc99c34e8
  );
}

export default App;
