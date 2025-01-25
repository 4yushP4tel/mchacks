from flask import Flask, request, jsonify, session
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_session import Session
import os
from datetime import datetime

app = Flask(__name__)
load_dotenv()

KEY = os.getenv('Key')

app.config['SESSION_TYPE'] = 'filesystem' 
app.config['SESSION_FILE_DIR'] = '/tmp/flask_session'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_Name'] = 'session'
app.config['SESSION_COOKIE_SECURE'] = True

db_host = os.getenv('dbhost')
db_user = os.getenv('dbuser')
db_password = os.getenv('dbpassword')
db_name = os.getenv('dbname')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Session(app)

class Patient(db.Model):
    __tablename__ = "patients"
    id = db.Column(db.Integer, primary_key=True)
    patient_name = db.Column(db.String(255), unique = True, nullable = False)
    email = db.Column(db.String(255), unique = True, nullable = False)
    age = db.Column(db.Integer, nullable = False)
    password = db.Column(db.String(50), nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now)


class Active_patients(db.Model):
    __tablename__ = "active_patients"
    id = db.Column(db.Integer, primary_key=True)
    patient_id = db.column(db.Integer, db.ForeignKey("patients.id"))
    patient_name = db.Column(db.String(255), unique = True, nullable = False)
    symptoms = db.Column(db.String(1000), nullable = False)
    email = db.Column(db.String(255), unique = True, nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now)


@app.route('/create_patient', methods = ["POST"])
def create_patient():
    data = request.get_json()
    patient_name = data.get("patient_name")
    email = data.get("email")
    password = data.get("password")
    age = data.get('age')

    existing_patient = Patient.query.filter(
        (Patient.email == email) | (Patient.patient_name == patient_name)).first()
    
    if existing_patient:
        return jsonify({"error": "patient already exists"}), 409
    
    patient = Patient(patient_name=patient_name, email=email, created_at = datetime.now(), password = password, age=age)

    try:
        db.session.add(patient)
        db.session.commit()

        return jsonify({
            "message": "patient_created"
        })


    except Exception as e:

        return jsonify({
            "message": f"error when creating patient, {e}"
        })




if __name__ == '__main__':
    app.run(app.run(debug=True))