import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admitted.css";
import Header from "../components/header";
import Footer from "../components/footer";
import axios from "axios";

export function Admitted() {
  const initialState = [{ id: 1, symptom: "", level: "Mild" }];
  const [symptoms, setSymptoms] = useState(initialState);
  const[added, setAdded] = useState(false)

  const check_added = async () => {
    const response = await axios.get("/api/check_added", { withCredentials: true})
    const stat = response.data.added
    setAdded(stat)
  }

  useEffect(() => {
    check_added();

    const interval = setInterval(check_added, 5000); 
    return () => clearInterval(interval);
  }, []);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { id: symptoms.length + 1, symptom: "", level: "Mild" }]);
  };

  const handleSymptomChange = (id, value) => {
    setSymptoms(symptoms.map((s) => (s.id === id ? { ...s, symptom: value } : s)));
  };

  const handleLevelChange = (id, value) => {
    setSymptoms(symptoms.map((s) => (s.id === id ? { ...s, level: value } : s)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const symptomString = symptoms
      .map((s) => `${s.symptom} (${s.level}), `)
      .join(", ");

    console.log(symptomString)

    try{
      const response = await axios.post("/api/get_in_line", {
        "symptoms" : symptomString
      });

      console.log(response);

    } catch {
      alert("You are already in the Queue. You will be notified when the next available doctor is available. Note that patients will be picked in order of severity")

    }
  };

  const already_in = (
                  <div className="already_in">
                    <p>You will be contacted once a doctor is available</p>
                    <p>Please note that clients are being contacted in order of urgency.</p>
                    <p>We thank you for your patience</p>
                    <Link to={"/"}>
                    <button>Go to Home Page</button>
                    </Link>
                  </div>)

  return (

    <div className="admitted-container">
      <Header />
      <h1>Symptom Checker</h1>


     {added? already_in : ( <form onSubmit={handleSubmit} className="form-container">
        {symptoms.map((s) => (
          <div key={s.id} className="admit-form-group">
            <div>
              <label htmlFor={`symptom-${s.id}`} >
                Symptom
              </label>
              <input
                type="text"
                id={`symptom-${s.id}`}
                value={s.symptom}
                required
                onChange={(e) => handleSymptomChange(s.id, e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`level-${s.id}`} >
                Severity Level
              </label>
              <select
                id={`level-${s.id}`}
                value={s.level}
                onChange={(e) => handleLevelChange(s.id, e.target.value)}
              >
                <option value="Mild">Mild</option>
                <option value="Moderate">Moderate</option>
                <option value="Severe">Severe</option>
              </select>
            </div>
          </div>
        ))}
              <div className="admit-button-group">
        <button
          type="button"
          onClick={handleAddSymptom}
          className="add_symp_button"
        >
          Add Symptom
        </button>
        <button
          type="submit"
        >
          Submit
        </button>
      </div>
      </form>)}
      <Footer/>
    </div>
  );
}

