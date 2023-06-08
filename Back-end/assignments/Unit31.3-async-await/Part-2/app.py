from flask import Flask, render_template, jsonify
import requests
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = "SECRET_KEY"

@app.route('/')
def load_page():
    return render_template('index.html')

@app.route('/card-new-deck')
def draw_one_card_new_deck():
    new_card = requests.get('http://deckofcardsapi.com/api/deck/new/draw/?count=1')
    return jsonify(new_card.json())

@app.route('/draw-again/<deck_id>')
def draw_same_deck(deck_id):
    new_card = requests.get(f'http://deckofcardsapi.com/api/deck/{deck_id}/draw/?count=1')
    return jsonify(new_card.json())

