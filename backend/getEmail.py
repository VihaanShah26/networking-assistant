import requests
import json

def getEmail(name, company):
    url = f"https://api.apollo.io/api/v1/people/match?name={name}&organization_name={company}"

    headers = {
        "accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": "KyCgvOFBDFo9dS9OABqkSA"
    }

    response = requests.post(url, headers=headers).text
    res = json.loads(response)
 
    return res

print(getEmail("Klaudia Bogacz", "Optiver"))