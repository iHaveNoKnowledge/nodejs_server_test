import json

with open('version.json', 'r') as f:
    data = json.load(f)
    current_version = data['version']


def main():
    print(f"Main Program ver:{current_version} Start")
    print("new feature 001")


if __name__ == "__main__":
    main()