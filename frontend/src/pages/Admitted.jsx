import React, { useState } from "react";

function Admitted() {
  const initialState = [{ id: 1, symptom: "", level: "Mild" }];
  const [symptoms, setSymptoms] = useState(initialState);

  const style = {
    display: "flex",
    justifyContent: "center",
  };

  const handleAddSymptom = () => {
    setSymptoms([...symptoms, { id: symptoms.length + 1, symptom: "", level: "Mild" }]);
  };

  const handleSymptomChange = (id, value) => {
    setSymptoms(symptoms.map(s => (s.id === id ? { ...s, symptom: value } : s)));
  };

  const handleLevelChange = (id, value) => {
    setSymptoms(symptoms.map(s => (s.id === id ? { ...s, level: value } : s)));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Symptoms:", symptoms);
    // Reset the form to the initial state
    setSymptoms(initialState);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {symptoms.map((s) => (
          <div key={s.id} style={style}>
            <div>
              <label htmlFor={`symptom-${s.id}`}>Symptoms</label><br />
              <input
                type="text"
                id={`symptom-${s.id}`}
                name={`symptom-${s.id}`}
                value={s.symptom}
                onChange={(e) => handleSymptomChange(s.id, e.target.value)}
              />
            </div>
            <div>
              <label htmlFor={`level-${s.id}`}>Level</label><br />
              <select
                id={`level-${s.id}`}
                name={`level-${s.id}`}
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
        <div style={style}>
          <button type="button" onClick={handleAddSymptom}>+</button>
          <p>Add new symptom</p>
          <input type="submit" value="Submit" />
        </div>
      </form>
    </div>
  );
}

export default Admitted;
