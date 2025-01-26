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
openai_key = os.getenv('openai_key')
ACCESS_KEY = os.getenv('CLINIC_ACCESS_KEY')

app.config['SESSION_TYPE'] = 'filesystem' 
app.config['SESSION_FILE_DIR'] = '/tmp/flask_session'
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_Name'] = 'session'
app.config['SESSION_COOKIE_SECURE'] = True
app.secret_key = KEY

db_host = os.getenv('dbhost')
db_user = os.getenv('dbuser')
db_password = os.getenv('dbpassword')
db_name = os.getenv('dbname')
app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{db_user}:{db_password}@{db_host}/{db_name}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
Session(app)

client = OpenAI(api_key= openai_key)
content = "rank all the patients in order of importance to treat without stating why, just give them in order"

def get_openai_response(prompt):
        completion = client.chat.completions.create(
            model= "gpt-4o",
            messages= [
                {"role": "system", "content": "You are a medical expert who will rank all the following in order of importance to treat. Do not give explanation on why. Also give the responses in JSON format"},
                {"role": "user", "content": prompt}
            ],
            temperature = 0.05
        )
        return completion.choices[0].message.content

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
    patient_id = db.Column(db.Integer, db.ForeignKey("patients.id"))
    patient_name = db.Column(db.String(255), unique = True, nullable = False)
    symptoms = db.Column(db.String(1000), nullable = False)
    email = db.Column(db.String(255), unique = True, nullable = False)
    created_at = db.Column(db.DateTime, default = datetime.now)

@app.route('/check_auth', methods = ["GET"])
def check_auth():
    if 'patient_id' in session:
        return jsonify({
            "authorization": True
        })

    else:
        return jsonify({
            "authorization": False
        })



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
        session['auth_status'] = True
        session['patient_id'] = patient.id
        session['patient_name'] = patient.patient_name
        session['email'] = patient.email

        return jsonify({
            "message": "patient_created",
            "auth_status" : session["auth_status"]
        })


    except Exception as e:

        return jsonify({
            "message": f"error when creating patient, {e}"
        })
    
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    patient = Patient.query.filter_by(email=email).first()
    if patient and password == patient.password:
        session['patient_id'] = patient.id
        session['patient_name'] = patient.patient_name
        session['email'] = patient.email
        session['auth_status'] = True
        print(f"session data: {session}")
        return jsonify({"message": "Logged in successfully",
                        "patient_id": session['patient_id'],
                        "auth_status": session['auth_status'],
                        "patient_name": session['patient_name']
                        }), 200
    else:
        return jsonify({"error": "Invalid email or password"}), 401
    
@app.route("/clinic_access", methods=["POST"])
def clinic_access():
    data = request.get_json()
    entered_key = data.get("entered_key")

    if entered_key == ACCESS_KEY:
        return jsonify({
            "access_grant" : True
        }), 200
    
    else:
        return jsonify({
            "access_grant" : False
        }), 401
    
@app.route("/get_in_line", methods=["POST"])
def get_in_line():
    data = request.get_json()
    patient_id = session['patient_id']
    patient_name = session['patient_name']
    email = session['email']
    symptoms = data.get('symptoms')

    active_patient = Active_patients(
        patient_id=patient_id,
        patient_name=patient_name,
        symptoms=symptoms,
        email=email,
        created_at=datetime.now()
    )

    try:
        db.session.add(active_patient)
        db.session.commit()
        return jsonify({
            "message": "Patient added to active list"
        })

    except Exception as e:
        print(e)
        return jsonify({
            "message": "Failed to add patient to active patients"
        })



if __name__ == '__main__':
    app.run(app.run(debug=True))