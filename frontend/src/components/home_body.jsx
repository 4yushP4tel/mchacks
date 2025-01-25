import React from "react";
import "./style.css";

function HomeBody() {
    return (
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
    )
}

export default HomeBody;