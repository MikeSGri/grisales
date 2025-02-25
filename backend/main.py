from fastapi import FastAPI, Form, HTTPException
import smtplib
from email.message import EmailMessage
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

app = FastAPI()
# Allow frontend (GitHub Pages) to access this API
origins = [
    "https://speedytransportation.pro",  # Replace with your actual GitHub Pages URL
    # "http://192.168.2.1:5500",  # For local testing

]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# Handle OPTIONS request explicitly
@app.options("/send-email/")
async def options_handler():
    return JSONResponse(content={}, status_code=200)


# Gmail SMTP Settings
SMTP_SERVER = "smtp.gmail.com"
SMTP_PORT = 465
EMAIL_USER = "mike.steven.gris@gmail.com"
EMAIL_PASSWORD = "pbmn xrsf qffc wwvt"  # Use your generated App Password

@app.post("/send-email/")
async def send_email(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...)
):
    msg = EmailMessage()
    msg["Subject"] = "New Contact Form Submission speedytransportation"
    msg["From"] = EMAIL_USER
    msg["To"] = "michael.grisales@keepmesafe.live"
    msg.set_content(f"Name: {name}\nEmail: {email}\nPhone: {phone}\nMessage: {message}")

    try:
        with smtplib.SMTP_SSL(SMTP_SERVER, SMTP_PORT) as server:
            server.login(EMAIL_USER, EMAIL_PASSWORD)
            server.send_message(msg)
        return {"message": "Email sent successfully!"}
    except Exception as e:
        return {"error": str(e)}
