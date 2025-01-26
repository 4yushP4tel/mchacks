import React, { useEffect, useState } from "react";
import Homepage from "./pages/homepage.jsx";
import Signup from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import {ClinicSignIn} from "./pages/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import "./style.css";
import { Clinic } from "./pages/clinic.jsx";
import {Admitted} from "./pages/Admitted.jsx";
import axios from 'axios';

function App() {
  const [clinic_access, setClinic_access] = useState(false)
  const [status, setStatus] = useState(null)

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
        <Route path="/" element={status? <Admitted/> :<Homepage/>}></Route>
        <Route path="/symptoms" element = {<Admitted/>}></Route>
        <Route path="/signup" element={<Signup setStatus={setStatus}/>}></Route>
        <Route path="/signin" element={<Signin setStatus={setStatus}/>}></Route>
        <Route path="/clinic_access" element={clinic_access? <Clinic/>:<ClinicSignIn setClinic_access = {setClinic_access}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
