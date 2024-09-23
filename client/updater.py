import requests
from packaging import version
import json

with open('version.json','r') as f:
    data = json.load(f)
    version_client = data['version']
    

url_target = 'http://localhost:3000/api/python/version'
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

