from openai import OpenAI
import os


def draftEmail(myname, university, major, name, company, linkedin):
    client = OpenAI()

    prompt = f"""
    My name is {myname}. I am majoring in {major} at {university}. I want to network with {name} who works at {company}. This is their LinkedIn profile: {linkedin}. Scrape all the information in their LinkedIn profile ({linkedin}) and write a professional email to them expressing my interest and requesting a 15 minute call. Include education/work experiences of {name} that you got from LinkedIn to make the email more personal. Do not leave anything for me to insert. Fill in all fields based on information gathered from {linkedin}. Also mention that I am attaching my resume for their reference. Return only the email body to me. Do not include contact information in the end. End with simple salutation.
    """

    response = client.responses.create(
        model="gpt-4o-mini",
        tools=[{"type": "web_search"}],
        input=prompt
    )

    print(response.output_text)

draftEmail("Vihaan Shah", "Northwestern University", "Computer Science", "David Zane", "Amazon", "https://www.linkedin.com/in/david-zane/")
