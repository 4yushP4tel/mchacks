import React, { useState } from "react";
import Header from "./components/header.jsx";
import Homepage from "./pages/homepage.jsx";
import Footer from "./components/footer.jsx";
import Signup from "./pages/signup.jsx";
import Signin from "./pages/signin.jsx";
import {ClinicSignIn} from "./pages/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./style.css";
import { Clinic } from "./pages/clinic.jsx";
import {Admitted} from "./pages/Admitted.jsx";
import axios from 'axios';

function App() {
  const [clinic_access, setClinic_access] = useState(false)
  const [status, setStatus] = useState(false)

  return (
    <Router>
      <Routes>
        <Route path="/" element={status? <Admitted/> :<Homepage/>}></Route>
        <Route path="/signup" element={<Signup setStatus={setStatus}/>}></Route>
        <Route path="/signin" element={<Signin setStatus={setStatus}/>}></Route>
        <Route path="/clinic_access" element={clinic_access? <Clinic/>:<ClinicSignIn setClinic_access = {setClinic_access}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
