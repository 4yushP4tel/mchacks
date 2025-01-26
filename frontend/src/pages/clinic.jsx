// import Header from '../components/Header';

// function Clinic(){
//     return(
//         <>
//             <Header/>
            
//         </>
//     );
// }

// export default Clinic;
import Header from "./components/header";
import React from "react";
import "./Test.css"
import { useState, useEffect } from "react";

const tableStyle = {
    width: "100%",
}

const divStyle = {
    padding: "20px",
    textAlign: "center",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
}


function Test(){

    const InitalState = [];

    const [patients, setPatients] = useState(InitalState);

    useEffect(() => {
        fetchPatients();
      }, []);

    const fetchPatients = async () => {
        try {
          const response = await fetch("/api/patients"); // Replace with your API endpoint
          const data = await response.json();
          setPatients(data); // Update state with fetched data
        } catch (error) {
          console.error("Error fetching patient data:", error);
        }
      };

    const dismissPatient = async (patientId) => {
        try {
          await fetch(`/api/patients/${patientId}`, {
            method: "DELETE", // Replace with appropriate HTTP method for dismissal
          });
          setPatients((prev) => prev.filter((patient) => patient.id !== patientId)); // Update UI after dismissal
        } catch (error) {
          console.error("Error dismissing patient:", error);
        }
      };
 
      
    return(
        <>
        <Header/>
            <div style={divStyle}>
            <table style={tableStyle}>
                <tr>
                    <th>#</th>
                    <th>Patient</th>
                    <th>Email</th>
                    <th>Symptoms</th>
                    <th>Wait Time</th>
                    <th>Action</th>
                </tr>
                <tbody>
                        {patients.length > 0 ? (
                    patients.map((patient, index) => (
                    <tr key={patient.id}>
                        <td>{index + 1}</td>
                        <td>{patient.id}</td>
                        <td>{patient.email}</td>
                        <td>{patient.symptoms}</td>
                        <td>{patient.waitTime}</td>
                        <td>
                        <button
                            onClick={() => dismissPatient(patient.id)}
                            style={{
                            background: "red",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            cursor: "pointer",
                            }}
                       >
                          Dismiss
                          </button>
                      </td>
                   </tr>
                   ))
                  ) : (
                  <tr>
                     <td colSpan="6" style={{ textAlign: "center" }}>
                      No patients found
                     </td>
                    </tr>
                )}
                </tbody>
            </table>
            </div>
        </>
  );
}

export default Test;