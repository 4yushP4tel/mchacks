import React from "react";
import Header from "./Header.jsx";
import HomeBody from "./HomeBody.jsx";
import Footer from "./Footer.jsx";
import "./style.css";

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