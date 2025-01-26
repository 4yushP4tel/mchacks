import React, { useEffect, useState } from "react";
import Homepage from "./pages/homepage.jsx";
import Signup from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import {ClinicSignIn} from "./pages/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Socials from "./pages/socials.jsx";
import { Clinic } from "./pages/clinic.jsx";
import {Admitted} from "./pages/Admitted.jsx";
import axios from 'axios';

function App() {
  const [clinic_access, setClinic_access] = useState(false)
  const [status, setStatus] = useState(null)
  const [averageTime, setAverageTime] = useState("");


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
        <Route path="/" element={status? <Admitted averageTime={averageTime}/> :<Homepage/>}></Route>

        <Route path="/socials" element={<Socials/>}></Route>
        <Route path="/symptoms" element = {<Admitted setStatus={setStatus} averageTime={averageTime}/>}></Route>
        <Route path="/clinic" element = {<Clinic averageTime = {averageTime} setAverageTime={setAverageTime}/>}></Route>
        <Route path="/signup" element={<Signup setStatus={setStatus}/>}></Route>
        <Route path="/signin" element={<Signin setStatus={setStatus}/>}></Route>
        <Route path="/clinic_access" element={clinic_access? <Clinic/>:<ClinicSignIn setClinic_access = {setClinic_access}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
