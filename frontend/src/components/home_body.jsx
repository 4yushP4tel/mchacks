import React from "react";
import { Link, useNavigate } from "react-router-dom";
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
            As a group of passionate students dedicated to the betterment of society, we aim to provide a platform for patients and hospitals alike to optimize the wait times for patients and the efficiency of hospitals. Our platform, CliniQ, is designed to help patients get the care they need in a timely manner, while also helping hospitals manage their patient queues effectively. We believe that everyone deserves access to quality healthcare, and we are committed to making that a reality.
            </p>
        </section>

        <section id="about" className="services about-bg">
            <h2>About Us</h2>
            <div className="about-list">
                <ul>
                {/* <div className="about-list"> */}
                    <li><a href="https://github.com/4yushP4tel/mchacks" target="_blank" class="link">GitHub</a></li>
                    <li><Link to={"/socials"} className="link">Socials</Link></li>
                {/* </div> */}
                </ul>
            </div>
        </section>
      </main>
    )
}

export default HomeBody;