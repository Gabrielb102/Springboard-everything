from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask import session, flash

secret_key = "noneofyourdamnbusiness"
db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class User(db.Model) :
    """Users for the site"""

    __tablename__ = "users"

    username = db.Column(db.String, primary_key=True, nullable=False)
    password = db.Column(db.String, nullable=False)
    email = db.Column(db.String, nullable=False)
    first_name = db.Column(db.String(30), nullable=False)
    last_name = db.Column(db.String(30), nullable=False)

    def register(username, password, email, first_name, last_name) :

        hashed = bcrypt.generate_password_hash(password)
        hashed_utf8 = hashed.decode("utf8")
        #if you don't do this, it will say "invalid salt"
        return User(username=username, password=hashed_utf8, email=email, first_name=first_name, last_name=last_name)

    def authenticate(username, password) :
        user = User.query.get(username)
        if user and bcrypt.check_password_hash(user.password, password) :
            session["user_id"] = user.username
            return True
        else :
            return False

    def __repr__(self) :
        u = self
        return f"User {u.username}: {u.first_name} {u.last_name}"

class Feedback(db.Model) :
    """Feedback made by Users"""

    __tablename__ = "feedback"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    title = db.Column(db.String(100), nullable=False)
    content = db.Column(db.String, nullable=False)
    username = db.Column(db.String, db.ForeignKey("users.username", ondelete="CASCADE"), nullable=False)

    author = db.relationship("User", backref="feedback")

    def __repr__(self) :
        f = self
        return f'Feedback {f.id} Title: {f.title} User: {f.username}'
    
    def authenticate(username, feedback) :
        """verifies user making change is the author of the feedback"""
        author = feedback.username
        if username == author : 
            return True
        else :
            return False
        
