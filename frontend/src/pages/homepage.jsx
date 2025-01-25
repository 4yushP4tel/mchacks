import React from "react";
import Header from "../components/header.jsx";
import HomeBody from "../components/home_body.jsx";
import Footer from "../components/footer.jsx";
import "../style.css";

function Homepage() {

    return (
        <div className="app-container">
            <Header />
            <HomeBody />
            <Footer />
        </div>
  );
}

export default Homepage;