"""Demo app using SQLAlchemy."""

from flask import Flask, request, redirect, render_template
from models import db, connect_db, Movie
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)
connect_db(app)

# configures which database were using for this app
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///movies_example'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True
app.config['SECRET_KEY'] = "SECRET!"
app.config['DEBUG_TB_INTERCEPT_REDIRECTS'] = False
debug = DebugToolbarExtension(app)

@app.route("/")
def list_movies():
    """List movies and show add form."""

    movies = Movie.query.all()
    return render_template("list.html", pets=pets)


@app.route("/", methods=["POST"])
def add_pet():
    """Add movie and redirect to list."""

    title = request.form['title']
    studio_id = request.form['studio_id']
    release_year = request.form['release_year']

    movie = Movie(title=title, studio_id=studio_id, release_year=release_year)
    db.session.add(movie)
    db.session.commit()

    return redirect(f"/{movie.id}")


@app.route("/<int:movie_id>")
def show_pet(movie_id):
    """Show info on a single movie."""

    movie = Movie.query.get_or_404(movie_id)
    return render_template("detail.html", movie=movie)
