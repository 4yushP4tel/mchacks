import React from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";
import "./style.css";

function App() {
  return (
    <div className="app-container">
      <Header />

      <main className="main-content">
        <section className="hero">
          <h1>Welcome to CliniQ</h1>
          <p>Your health, our priority. Consult with top doctors from the comfort of your home.</p>
          <button className="cta-button">Book an Appointment</button>
        </section>

        <section id="services" className="services">
          <h2>Our Services</h2>
          <ul>
            <li>Virtual Consultations</li>
            <li>Prescription Management</li>
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
  );
}

export default App;
