import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import React from "react";
import "./clinic.css"
import { useState, useEffect } from "react";
import axios from "axios";



export function Clinic() {
  const [rankedPatients, setRankedPatients] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPatients();
  }, []);

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/create_queue", {withCredentials:true}); // Replace with your API endpoint
      console.log(response.data.ranked_patients.patients)
      const patients = response.data?.ranked_patients?.patients || [];  // Safely access patients array
      setRankedPatients(patients);
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally{
      setLoading(false);
    }
  };

  const dismissPatient = async (patientId) => {
    try {
      await axios.delete(`/api/remove_active_patient/${patientId}`,{ withCredentials: true });
      setRankedPatients((prev) => prev.filter((patient) => patient.id !== patientId)); // Update UI after dismissal
    } catch (error) {
      console.error("Error dismissing patient:", error);
    }
  };


  return (
    <>
      <Header />

      <div className="clinic_body">

        <div className="clinic_table">

          {loading ? (<p className="loading-bounce">Loading patients...🧑‍⚕️</p>):
          (<table>
            <tr>
              <th>Priority</th>
              <th>Patient</th>
              <th>Email</th>
              <th>Symptoms</th>
              <th>Wait Time</th>
              <th>Action</th>
            </tr>
            <tbody>
              {rankedPatients.length > 0 ? (
                rankedPatients.map((patient, index) => (
                  <tr key={patient.id}>
                    <td>{index + 1}</td>
                    <td>{patient.name}</td>
                    <td>{patient.email}</td>
                    <td>{patient.symptoms}</td>
                    <td>{patient.waiting_time}</td>
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
          </table>)}
        </div>

        <button
          onClick={fetchPatients}
        >
          Refresh Patients
        </button>


      </div>
      
      <Footer/>
    </>
  );
}

