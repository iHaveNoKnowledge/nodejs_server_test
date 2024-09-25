import requests
from packaging import version
import json
from dotenv import load_dotenv
import os
import keyboard
from modules import downloader

# * โหลดค่าจาก .env function นี้รับค่า dir ของ env ได้นะหากมันไม่ได้อยู่ที่เดียวกับ py
load_dotenv()

current_path = os.getcwd()
print(f"current path: {current_path}")

with open('version.json', 'r') as f:
    data = json.load(f)
    client_version = data['version']

serverVersionUrl = os.getenv("api_server_version")
response = requests.get(serverVersionUrl)
if response.status_code == 200:
    server_version = response.json()
    print(f"{server_version}: {type(server_version)}")
else:
    print('Error: ', response.status_code)

print(f"{version.parse(client_version)} < {version.parse(server_version)}")
if version.parse(client_version) < version.parse(server_version):
    print("Download new version")
    downloader.download_new_ver()
    with open('version.json', 'w', encoding='utf-8') as json_file:
        json.dump({"version": server_version}, json_file, ensure_ascii=False, indent=4)
else:
    print("No new version")

with open('client_main.py') as file:
    exec(file.read())
