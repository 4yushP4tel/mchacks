import Header from "../components/header.jsx";
import Footer from "../components/footer.jsx";
import React from "react";
import "./clinic.css"
import { useState, useEffect } from "react";
import axios from "axios";



export function Clinic() {
  const [rankedPatients, setRankedPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [avgtime, setAvgtime] = useState("")

  const avg_time = async () => {
    const response = await axios.get("/api/average_wait_time", {withCredentials:true})
    const avrg_time = response.data.average_wait_time;
    console.log(avrg_time)
    setAvgtime(avrg_time)
  }

  useEffect(() => {
    fetchPatients();
    avg_time();
  }, []);

  const fetchPatients = async () => {
    setLoading(true)
    try {
      const response = await axios.get("/api/create_queue", {withCredentials:true}); 
      console.log(response.data.ranked_patients)
      const patients = response.data?.ranked_patients || [];  
      setRankedPatients(patients);      
    } catch (error) {
      console.error("Error fetching patient data:", error);
    } finally{
      setLoading(false);
    }
  };

  const dismissPatient = async (patientId) => {
    const confirmDismissal = window.confirm("Are you sure you want to dismiss this patient?");
    if(!confirmDismissal){
      return;
    }

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
        <p>Average Waiting Time: {avgtime}</p>

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

