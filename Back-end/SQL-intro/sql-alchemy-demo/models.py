"""Demo file showing off a model for SQLAlchemy."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()
def connect_db(app):
    """Connect to database."""
    db.app = app
    db.init_app(app)


class Movie(db.Model):
    """Movie."""

    __tablename__ = "movies"

    id = db.Column(db.Integer,
        primary_key=True,
        autoincrement=True)
    title = db.Column(db.String(50),
        nullable=False)
    release_year = db.Column(db.Integer, 
        nullable=True)
    rating = db.Column(db.String(10), 
        nullable=False, 
        default='Not Rated')
    studio_id = db.Column(db.Integer,
        nullable = True)

    def __repr__(self) :
        m = self
        return f"<Pet id={m.id} name={m.title} release_date={m.release_year}>"

    def announce(self) :
        return f"Coming to a theater near you this {self.release_year} Winter season."

    def make_sequel(self) :
        title = self.title
        sequel_title = title + " 2"
        self.title = sequel_title
        return None

    @classmethod
    def get_by_studio(cls, studio_id) :
        return cls.query.filter_by(studio_id=studio_id).all()