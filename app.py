from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__, static_folder='static', template_folder='templates')
CORS(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/send_email', methods=['POST'])
def send_email():
    data = request.get_json(force=True)
    print(request.headers)
    print(request.data)
    if not data:
        return jsonify({"error": "No data provided"}), 400

    name = data.get('name')
    email = data.get('email')
    subject = data.get('subject', 'No Subject')
    phone = data.get('phone', 'No Phone Number')

    if not name or not email:
        return jsonify({"error": "Name and email are required"}), 400

    sender_email = os.getenv('EMAIL_USER')
    sender_password = os.getenv('EMAIL_PASS')
    recipient_email = os.getenv('EMAIL_USER')

    message = MIMEMultipart()
    message['From'] = sender_email
    message['To'] = recipient_email
    message['Subject'] = f"Collaboration Request: {subject}"

    body = f"""
    Name: {name}
    Email: {email}
    Phone: {phone}
    Message: {subject}
    """
    message.attach(MIMEText(body, 'plain'))

    try:
        with smtplib.SMTP('smtp.gmail.com', 587) as server:
            server.starttls()
            server.login(sender_email, sender_password)
            server.send_message(message)

        print(f"Email sent: {name}, {email}, {subject}, {phone}")
        return jsonify({"message": "Email sent successfully"}), 200
    except Exception as e:
        print(e)
        return jsonify({"error": "Failed to send email"}), 500

if __name__ == '__main__':
    app.run(debug=True)