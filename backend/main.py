from flask import Flask, request, jsonify
from flask_cors import CORS
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time
from getProfiles import getProfiles
from getEmail import getEmail

app = Flask(__name__)
CORS(app)

@app.route('/get_profiles')
def get_profiles():
    # Get parameters from query string with defaults
    job_title = request.args.get("job_title", "Software Engineer")
    company = request.args.get("company", "Amazon")
    university = request.args.get("university", "Northwestern University")
    
    res = getProfiles(job_title, company, university)
    return res

@app.route('/get_email')
def get_email():
    name = request.args.get("name", "David Zane")
    company = request.args.get("company", "Amazon")
    
    # Assuming getEmail is defined in getEmail.py
    res = getEmail(name, company)
    
    return res 

@app.route('/draft_email')
def draft_email(name, company):
    name = request.args.get("name", "David Zane")
    company = request.args.get("company", "Amazon")

if __name__ == '__main__':
    app.run(debug=True, port=5001)