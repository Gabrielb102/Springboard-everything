from flask import Flask

app = Flask(__name__)

@app.route("/welcome")
def display_welcome_message() :
    return "welcome"

@app.route("/welcome/home")
def display_welcome_back_message() :
    return "welcome home"

@app.route("/welcome/back")
def display_welcome_home_message() :
    return "welcome back"