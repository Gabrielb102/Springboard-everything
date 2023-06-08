"""Flask app for Cupcakes"""

from flask import Flask, request, flash, request, render_template, redirect, jsonify
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Cupcake
import requests

app = Flask(__name__)
app.config['SECRET_KEY'] = "isitthedietorthelifestyle"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///cupcakes"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/')
def render_cupcakes_page() :
    return render_template('cupcakes.html')

@app.route('/api/cupcakes', methods=['GET'])
def list_cupcakes() :
    """lists all cupcakes in database"""
    cupcakes = Cupcake.query.all()
    serialized = [c.serialize() for c in cupcakes]
    return jsonify(cupcakes=serialized)

@app.route('/api/cupcakes/<cupcake_id>', methods=['GET'])
def get_cupcake(cupcake_id) :
    """lists the cupcake specified by the cupcake id"""
    cupcake = Cupcake.query.get(cupcake_id)
    serialized = cupcake.serialize()
    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes', methods=['POST'])
def create_cupcake() :
    new_cupcake = Cupcake(flavor=request.json["flavor"], size=request.json["size"], rating=request.json["rating"], image=request.json["image"])
    db.session.add(new_cupcake)
    db.session.commit()
    serialized = new_cupcake.serialize()
    return (jsonify(cupcake=serialized), 201)

@app.route('/api/cupcakes/<cupcake_id>', methods=['PATCH'])
def update_cupcake(cupcake_id) : 
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.query(Cupcake).filter_by(id=cupcake_id).update(request.json)
    db.session.add(cupcake)
    db.session.commit()
    serialized = cupcake.serialize()

    return jsonify(cupcake=serialized)

@app.route('/api/cupcakes/<cupcake_id>', methods=['DELETE'])
def delete_cupcake(cupcake_id) :
    cupcake = Cupcake.query.get_or_404(cupcake_id)
    db.session.delete(cupcake)
    db.session.commit()
    return jsonify(message="deleted")