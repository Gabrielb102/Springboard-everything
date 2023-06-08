from flask_wtf import FlaskForm
from wtforms import StringField, FloatField, IntegerField, RadioField, TextAreaField, BooleanField
from wtforms.validators import InputRequired, Optional, URL, Length

class AddPetForm(FlaskForm) :
    """form to add more pets to database"""

    name = StringField("The new Pet's name", validators=[InputRequired(message='The new guy must have a name')])
    species = StringField('Species', validators=[InputRequired(message='What kind of an animal are they?')])
    photo_url = StringField('Photo URL', validators=[Optional(), Length(min=10, message='Photo URL must be a valid photo URL'), URL(message='Photo URL must be a valid photo URL')])
    age = IntegerField('Age', validators=[Optional()])
    notes = TextAreaField('Notes', validators=[Optional()])
    available = BooleanField('Available for adoption?')


