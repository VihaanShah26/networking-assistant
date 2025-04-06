# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
import google.cloud.firestore
import requests
import json
# from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options
import time 
import tempfile

initialize_app()

@https_fn.on_request()
def getEmail(req):

    name = req.args.get('name') if req.args.get('name') else "David Zane"
    company = req.args.get('company') if req.args.get('company') else "Amazon"

    url = f"https://api.apollo.io/api/v1/people/match?name={name}&organization_name={company}"

    headers = {
        "accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": "5ljZFXx2HQAFBmRNJ08eUA"
    }

    response = requests.post(url, headers=headers).text
    res = json.loads(response)
 
    return res


@https_fn.on_request()
def getProfiles(req): 
    job_title = req.args.get('job_title') if req.args.get('job_title') else "Software Engineer"
    company = req.args.get('company') if req.args.get('company') else "Amazon"
    university = req.args.get('university') if req.args.get('university') else "Northwestern University"

    query = f'site:linkedin.com/in "{job_title}" "{company}" "{university}"'
    search_url = f"https://www.google.com/search?q={query.replace(' ', '+')}"

    # ----- SETUP CHROME -----
    options = Options()
    # options.add_argument("--headless=new")  # new headless mode
    options.add_argument("--window-size=1920,1080")
    options.add_argument("--disable-blink-features=AutomationControlled")
    driver = webdriver.Chrome(options=options)
    temp_dir = tempfile.mkdtemp()
    options.add_argument(f"--user-data-dir={temp_dir}")

    # ----- GO TO GOOGLE SEARCH -----
    driver.get(search_url)
    time.sleep(3)

    # ----- HANDLE GOOGLE CONSENT (EU/first-time IPs) -----
    try:
        consent_button = driver.find_element(By.XPATH, '//button[.="I agree"] | //button[.="Accept all"]')
        consent_button.click()
        time.sleep(2)
    except:
        pass  # No consent screen

    # ----- SCRAPE SEARCH RESULTS -----
    results = driver.find_elements(By.CSS_SELECTOR, "div.tF2Cxc")

    profiles = []
    for result in results:
        try:
            title = result.find_element(By.TAG_NAME, "h3").text
            name = title.split("-")[0].strip()
            link = result.find_element(By.TAG_NAME, "a").get_attribute("href")
            if "linkedin.com/in/" in link:
                profiles.append({"name": name, "linkedin_url": link})
        except Exception as e:
            print("Skipped a result due to:", e)

    driver.quit()
        
    return profiles