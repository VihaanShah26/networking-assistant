import time 
import tempfile
from flask import Flask, request, jsonify
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.chrome.options import Options


def getProfiles(job_title, company, university):
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
        
    return jsonify(profiles)