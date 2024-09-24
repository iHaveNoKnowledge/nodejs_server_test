import requests
from packaging import version
import json
from dotenv import load_dotenv
import os
import keyboard

# * โหลดค่าจาก .env function นี้รับค่า dir ของ env ได้นะหากมันไม่ได้อยู่ที่เดียวกับ py
load_dotenv()

with open('version.json', 'r') as f:
    data = json.load(f)
    version_client = data['version']

url_target = os.getenv("api_url")
response = requests.get(url_target)
if response.status_code == 200:
    version_server = response.json()
    print(f"{version_server}: {type(version_server)}")

else:
    print('Error: ', response.status_code)

print(f"{version.parse(version_client)} {version.parse(version_server)}")
if version.parse(version_client) < version.parse(version_server):
    print("Download new version")
else:
    print("No new version")

with open('client_main.py') as file:
    exec(file.read())
