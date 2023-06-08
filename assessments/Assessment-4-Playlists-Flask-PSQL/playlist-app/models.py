"""Models for Playlist app."""

from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Song(db.Model):
    """Song."""

    __tablename__ = "songs"

    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    title = db.Column(db.String, nullable = False)
    artist = db.Column(db.String, nullable = False)

    def __repr__(self):
        s = self
        return f'Song {s.id}: {s.title}'

class PlaylistSong(db.Model):
    """Mapping of a playlist to a song."""

    __tablename__ = "playlists_songs"

    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    playlist_id = db.Column(db.Integer, db.ForeignKey("playlists.id", ondelete="CASCADE") ,nullable = False)
    song_id = db.Column(db.Integer, db.ForeignKey("songs.id", ondelete="CASCADE"), nullable = True)

class Playlist(db.Model):
    """Playlist."""

    __tablename__ = "playlists"

    id = db.Column(db.Integer, autoincrement = True, primary_key = True)
    name = db.Column(db.String, nullable = False)
    description = db.Column(db.String, nullable = True)

    songs = db.relationship("Song", secondary="playlists_songs", backref="playlists")

    def __repr__(self):
        p = self
        return f'Playlist {p.id}: {p.name}'

    def add(self, song):
        """Add song to playlist"""
        p = self
        if isinstance(song, Song):
            p.songs.append(song)
            return p

# DO NOT MODIFY THIS FUNCTION
def connect_db(app):
    """Connect to database."""

    db.app = app
    db.init_app(app)
