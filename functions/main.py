# Welcome to Cloud Functions for Firebase for Python!
# To get started, simply uncomment the below code or create your own.
# Deploy with `firebase deploy`

from firebase_functions import https_fn
from firebase_admin import initialize_app
import google.cloud.firestore
import requests
import json

initialize_app()


@https_fn.on_request()
def on_request_example(req: https_fn.Request) -> https_fn.Response:
    return https_fn.Response("Hello world!")

@https_fn.on_request()
def getEmail(req):

    name = req.args.get('name') if req.args.get('name') else "David Zane"
    company = req.args.get('company') if req.args.get('company') else "Amazon"

    url = "https://api.apollo.io/api/v1/people/match?name={name}&organization_name={company}"

    headers = {
        "accept": "application/json",
        "Cache-Control": "no-cache",
        "Content-Type": "application/json",
        "x-api-key": "5ljZFXx2HQAFBmRNJ08eUA"
    }

    response = requests.post(url, headers=headers).text
    res = json.loads(response)
 
    return res