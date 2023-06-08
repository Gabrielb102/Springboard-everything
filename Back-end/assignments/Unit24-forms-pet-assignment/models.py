from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)

class Pet(db.Model) :
    """Potential Pet"""

    __tablename__="pets"

    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), nullable=False)
    species = db.Column(db.String, nullable=False, default='Unknown')
    photo_url = db.Column(db.String, nullable=False, default='static/Robotdog.jpg')
    age = db.Column(db.Integer, nullable=True)
    notes = db.Column(db.String, nullable=True)
    available = db.Column(db.Boolean, nullable=False, default=True)

    def __repr__(self) :
        p = self
        return f"Pet {p.id}: {p.name}, species: {p.species}"