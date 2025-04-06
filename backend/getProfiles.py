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
    options.add_argument("--window-size=0,0")
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


# print(getProfiles("Software Engineer", "Amazon", "Northwestern University"))


# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import quote_plus
# from fake_useragent import UserAgent
# import time 

# import requests
# from bs4 import BeautifulSoup
# from urllib.parse import quote_plus

# def get_profiles(job_title, company, university):
#     headers = {
#         "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)"
#     }

#     query = f'site:linkedin.com/in "{job_title}" "{company}" "{university}"'
#     url = f"https://www.google.com/search?q={query.replace(' ', '+')}"

#     res = requests.get(url, headers=headers)
    
#     if res.status_code != 200:
#         return {"error": f"Google blocked the request. Status code: {res.status_code}"}

#     soup = BeautifulSoup(res.text, "html.parser")
#     print(soup.prettify())
#     profiles = []
#     for result in soup.select("div.g"):
#         a_tag = result.find("a")
#         title_tag = result.find("h3")
#         if a_tag and title_tag and "linkedin.com/in/" in a_tag["href"]:
#             name = title_tag.get_text().split("-")[0].strip()
#             link = a_tag["href"]
#             profiles.append({"name": name, "linkedin_url": link})

#     return profiles


# profiles = get_profiles("Software Engineer", "Amazon", "Northwestern University")
# print(profiles)
# for p in profiles:
#     print(p)