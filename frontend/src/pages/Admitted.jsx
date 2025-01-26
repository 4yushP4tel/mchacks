import React, { useState } from "react";
import "./Admitted.css";
import Header from "../components/header";

export function Admitted() {
  const initialState = [{ id: 1, symptom: "", level: "Mild" }];
  const [symptoms, setSymptoms] = useState(initialState);

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { id: symptoms.length + 1, symptom: "", level: "Mild" }]);
  };

  const handleSymptomChange = (id, value) => {
    setSymptoms(symptoms.map((s) => (s.id === id ? { ...s, symptom: value } : s)));
  };

  const handleLevelChange = (id, value) => {
    setSymptoms(symptoms.map((s) => (s.id === id ? { ...s, level: value } : s)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSymptoms(symptoms);
    console.log(symptoms);




  };

  return (

    <div className="container">
      <Header/>
      <h1>Symptom Checker</h1>
      <form onSubmit={handleSubmit} className="form-container">
        {symptoms.map((s) => (
          <div key={s.id} className="form-group">
            <div>
              <label htmlFor={`symptom-${s.id}`} >
                Symptom
              </label>
              <input
                type="text"
                id={`symptom-${s.id}`}
                value={s.symptom}
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
      </form>
        <div className="button-group">
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
    </div>
  );
}

