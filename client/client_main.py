import json
from tkinter import *
import updater

with open('version.json', 'r') as f:
    data = json.load(f)
    current_version = data['version']


def create_ui():
    print("new feature create ui")
    root = Tk()
    root.title("Hello")

    root.geometry("300x200")

    label = Label(root, text="Hello World", font=("Arial", 20))
    label.pack(pady=50)
    
    update_btn = Button(root, text="Update", command=updater.download_new_ver)

    root.mainloop()


def main():
    print(f"Main Program ver:{current_version} Start")
    print("new feature 001")
    create_ui()


if __name__ == "__main__":
    main()
