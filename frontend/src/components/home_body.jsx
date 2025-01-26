import React from "react";
import { Link } from "react-router-dom";
import "../style.css";

function HomeBody() {
    return (
        <main className="main-content">
        <section className="hero">
            <h1>Welcome to CliniQ</h1>
            <p>Your health, our priority. Consult with top doctors from the comfort of your home.</p>
            <Link to={"/signup"}>
                <button className="cta-button">Start Today</button>
            </Link>

        </section>


        <section id="services" className="services">
            <h2>Our Mission</h2>
            <p>
                We are a dedicated team of medical professionals bringing healthcare to your doorstep.
                With advanced technology and personalized care, we make your health journey seamless.
            </p>
        </section>

        <section id="about" className="services about-bg">
            <h2>About Us</h2>
            <ul>
                <li>GitHub</li>
                <li>Socials</li>
            </ul>
        </section>
      </main>
    )
}

export default HomeBody;