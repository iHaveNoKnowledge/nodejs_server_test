import requests
import os
from dotenv import load_dotenv
from pathlib import Path

current_path = Path(__file__).resolve()
base_dir = current_path.parent.parent
env_dir = os.path.join(base_dir, '.env')
load_dotenv(env_dir)


def download_new_ver():
    response = requests.get(os.getenv("api_download"), stream=True)
    if response.status_code == 200:
        if 'Content-Disposition' in response.headers:
            content_disposition = response.headers['Content-Disposition']
            filename = content_disposition.split('=')[-1].strip('\"')
            print(f"content_disposition: {content_disposition}")
            print(f"filename: {filename}")
            save_location = os.path.join(base_dir, filename)
            
        else:
            filename = os.path.basename(os.getenv("api_download"))

        with open(save_location, 'wb') as destination:
            for chunk in response.iter_content(chunk_size=8192):
                destination.write(chunk)

        print(f"Download new version to {save_location} successfully")
    else:
        print(f"Error: {response.status_code}")
