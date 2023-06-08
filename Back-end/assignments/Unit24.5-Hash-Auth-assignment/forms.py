from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, TextAreaField
from flask_bcrypt import Bcrypt

from wtforms.validators import InputRequired, Length

class RegisterForm(FlaskForm) :
    """Form to create a new user"""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])
    email = StringField('Email Address', validators=[InputRequired()])
    first_name = StringField('First Name', validators=[InputRequired(), Length(max=30)])
    last_name = StringField('Last Name', validators=[InputRequired(), Length(max=30)])

class LoginForm(FlaskForm) :
    """Form to authenticate an existing user"""

    username = StringField('Username', validators=[InputRequired()])
    password = PasswordField('Password', validators=[InputRequired()])

class FeedbackForm(FlaskForm) :
    """Form to create new Feedback"""

    title = StringField('Title', validators=[InputRequired(), Length(max=100)])
    content = TextAreaField('Content', validators=[InputRequired()])
