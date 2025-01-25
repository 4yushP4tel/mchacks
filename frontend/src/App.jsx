import React from "react";
import "./index.css";

function App() {
  return (
    <div className="app-container">
      <header className="header">
        <div className="logo">CliniQ</div>
        <nav className="navbar">
          <ul>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

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

      <footer className="footer">
        <p>© {new Date().getFullYear()} CliniQ. All rights reserved.</p>
        <nav className="footer-nav">
          <a href="#privacy-policy">Privacy Policy</a>
          <a href="#terms-of-service">Terms of Service</a>
        </nav>
      </footer>
    </div>
  );
}

export default App;
