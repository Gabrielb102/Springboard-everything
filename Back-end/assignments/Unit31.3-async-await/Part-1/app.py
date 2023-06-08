from flask import Flask, render_template, jsonify
import requests
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = "SECRET_KEY"

@app.route('/')
def load_page():
    return render_template('index.html')

@app.route('/<favorite_numbers>')
def load_number_fact(favorite_numbers):
    request = requests.get(f'http://numbersapi.com/{favorite_numbers}?json')
    return jsonify(request.json())
