import React, {useState, useEffect} from "react";
import Header from "./components/header.jsx";
import Homepage from "./pages/homepage.jsx";
import Footer from "./components/footer.jsx";
import Signup from "./pages/signup.jsx";
import { Signin } from "./pages/signin.jsx";
import {ClinicSignIn} from "./components/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./style.css";

function App() {

  const [status, setStatus] = useState(false)

  useEffect(() => {
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get('/api/check_auth', { withCredentials: true });
            setStatus(response.data.auth_status);
        } catch (error) {
            console.error('Error checking authentication status:', error);
            setStatus(false);
        }
    };

    checkAuthStatus();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/clinic_access" element={<ClinicSignIn/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
