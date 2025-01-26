import React from "react";
import Header from "./components/header.jsx";
import Homepage from "./pages/homepage.jsx";
import Footer from "./components/footer.jsx";
import Signup from "./pages/signup.jsx";
import { Signin } from "./pages/signin.jsx";
import {ClinicSignIn} from "./pages/clinicSignIn.jsx"
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import "./style.css";
<<<<<<< HEAD
import { Clinic } from "./pages/clinic.jsx";
import {Admitted} from "./pages/Admitted.jsx";
import axios from 'axios';
=======
>>>>>>> 6f587a63de7ecc13a2af6898069638a1d2f2602c

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage/>}></Route>
        <Route path="/signup" element={<Signup/>}></Route>
        <Route path="/signin" element={<Signin/>}></Route>
        <Route path="/clinic_access" element={clinic_access? <Clinic/>:<ClinicSignIn setClinic_access = {setClinic_access}/>}></Route>
      </Routes>
    </Router>
  );
}

export default App;
