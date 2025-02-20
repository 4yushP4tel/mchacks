from flask import Flask, request, jsonify, session
from openai import OpenAI
from flask_sqlalchemy import SQLAlchemy
from dotenv import load_dotenv
from flask_session import Session
import os
from datetime import datetime
import json
import smtplib
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

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
content = "rank all the patients in order of importance to treat without stating why, just give them in order."

email_password = os.getenv('email_password')

def send_email(recipient_email):

    body = """
    Hey there, a doctor is soon ready to see you. You could make your way to CliniQ in 45 minutes.
    Make your way to the reception and you will be directed to your designated room. Thank you for your patience.
    """

    try:
        msg = MIMEMultipart()
        msg['From'] = "cliniq56@gmail.com"
        msg['To'] = recipient_email
        msg['Subject'] = "CliniQ: A doctor is ready to see you!"
        msg.attach(MIMEText(body, 'plain'))
        server = smtplib.SMTP("smtp.gmail.com", 587)
        server.starttls()  
        server.login("cliniq56@gmail.com", "grse hkqo hkrx ixdr")
        server.send_message(msg)
        
        print('Email sent successfully!')
        server.quit()
    except Exception as e:
        print(f'Error: {e}')



def get_openai_response(prompt):
        completion = client.chat.completions.create(
            model= "gpt-4",
            messages= [
                {"role": "system", "content": "You will rank all the following people in order of importance to treat. Do not give explanation on why. No matter what the person's symptoms are. Also give the responses in JSON format"},
                {"role": "user", "content": prompt}
            ],
            temperature = 0.005
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
        session['created_at'] = patient.created_at

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
        session['created_at'] = patient.created_at
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

    existing_active_patient = Active_patients.query.filter_by(patient_id=patient_id).first()

    if existing_active_patient:
        return jsonify({
            "error": "Patient is already in the active list"
        }), 401

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
        }), 200

    except Exception as e:
        print(e)
        return jsonify({
            "message": "Failed to add patient to active patients"
        }), 401

@app.route("/create_queue", methods=["GET"])
def create_queue():
    active_patients = Active_patients.query.all()
    
    patient_list = [{"id": p.patient_id,
                    "name": p.patient_name,
                    "email": p.email,
                    "symptoms": p.symptoms,
                    "waiting_time": f"{(lambda delta: f'{int(delta.total_seconds() // 3600):02}:{int((delta.total_seconds() % 3600) // 60):02}:{int(delta.total_seconds() % 60):02}')((datetime.now() - p.created_at))}"
                    } for p in active_patients]
    
    patients_json = json.dumps(patient_list)
    prompt = f"Rank the following patients in order of importance to treat and do not explain why.Return time in the format hh:mm:ss. Return the response in Json format:  {patients_json}"

    try:
        openai_response = get_openai_response(prompt)
        ranked_patients = json.loads(openai_response)
    except Exception as e:
        return jsonify({
            "error" : f"openai error, {e}",
            "prompt": prompt
            }), 401

    return jsonify({
        "ranked_patients": ranked_patients
    }), 200

@app.route("/average_wait_time", methods = ["GET"])
def average_wait_time():
    active_patients = Active_patients.query.all()
    waiting_times = [
            (datetime.now() - patient.created_at).total_seconds()
            for patient in active_patients]
    total_wait_time = sum(waiting_times)
    average_wait_seconds = total_wait_time / len(waiting_times)

        # Convert average wait time to hh:mm:ss
    hours = int(average_wait_seconds // 3600)
    minutes = int((average_wait_seconds % 3600) // 60)
    seconds = int(average_wait_seconds % 60)
    average_wait_time = f"{hours:02}:{minutes:02}:{seconds:02}"

    return jsonify({"average_wait_time": average_wait_time}), 200

@app.route("/remove_active_patient/<int:patient_id>", methods=["DELETE"])
def remove_active_patient(patient_id):
    try:

        active_patient = Active_patients.query.filter_by(patient_id=patient_id).first()

        if not active_patient:
            return jsonify({"error": "Patient not found in the active list"}), 404

        # Delete the patient from the database
        recipient_email = active_patient.email
        send_email(recipient_email)
        db.session.delete(active_patient)
        db.session.commit()
        return jsonify({"message": f"Patient with ID {patient_id} removed from the active list"}), 200

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"error": "Failed to remove patient"}), 500
    
@app.route("/check_added", methods = ["GET"])
def check_added():
    
    if Active_patients.query.filter_by(patient_id=session['patient_id']).first():
        return jsonify({
            "added": True
        })
    else:
        return jsonify({
            "added": False
        })




if __name__ == '__main__':
    app.run(app.run(debug=True))