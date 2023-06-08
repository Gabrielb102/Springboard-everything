from flask import Flask, request, flash, request, render_template, redirect
from flask_debugtoolbar import DebugToolbarExtension
from models import db, connect_db, Pet
from forms import AddPetForm

app = Flask(__name__)
app.config['SECRET_KEY'] = "itsaservalorbust"
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///pets"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# debug = DebugToolbarExtension(app)

connect_db(app)

@app.route('/') 
def show_homepage() :
    """Displays the homepage, which has the list of all pets in database"""

    pets = Pet.query.all()
    return render_template('homepage.html' ,pets=pets)

@app.route('/add', methods=['GET','POST'])
def process_pet_form() :
    """Show pet form or submit pet form, depending on validation check"""
    
    form = AddPetForm()
    if form.validate_on_submit() :

        name = form.name.data
        species = form.species.data
        age = form.age.data
        notes = form.notes.data
        available = form.available.data
        if len(form.photo_url.data) > 1 :
            photo_url = form.photo_url.data
        else :
            photo_url = 'static/Robotdog.jpg'


        pet = Pet(name=name, species=species, photo_url=photo_url, age=age, notes=notes, available=available)

        db.session.rollback()
        db.session.add(pet)
        db.session.commit()

        return redirect('/')
    else :
        return render_template('addpetform.html', form=form)

@app.route('/<pet_id>', methods=['GET', 'POST'])
def pet_detail_page_handler(pet_id) :
    form = AddPetForm()
    pet = Pet.query.get(pet_id)

    if form.validate_on_submit() :
        db.session.rollback()
        pet.name = form.name.data
        pet.species = form.species.data
        pet.age = form.age.data
        pet.notes = form.notes.data
        pet.available = form.available.data
        if len(form.photo_url.data) > 1 :
            pet.photo_url = form.photo_url.data
        else :
            pet.photo_url = 'static/Robotdog.jpg'

        db.session.add(pet)
        db.session.commit()
        return redirect('/')

    else :
        form.name.data = pet.name
        form.species.data = pet.species
        form.photo_url.data = pet.photo_url
        form.age.data = pet.age
        form.notes.data = pet.notes
        form.available.data = pet.available
        return render_template('pet-detail-edit.html', pet=pet, form=form)