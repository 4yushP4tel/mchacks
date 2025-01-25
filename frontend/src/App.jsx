import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css'

function App() {
  

  return (
    <Router>
      <Routes>
        <Route path='/signin' element={<Signin/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/patients_welcome' element={<Patients_welcome/>}></Route>
        <Route path='/clinic_welcome' element={<Clinic_welcome/>}></Route>
      </Routes>
    </Router>

  )
}

export default App
