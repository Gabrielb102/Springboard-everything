from app import app
from models import db, Playlist, Song, PlaylistSong

db.drop_all()
db.create_all()

lying = Song(title = "Lying From You", artist = "Linkin Park")
end = Song(title = "In The End", artist = "Linkin Park")
almost = Song(title = "Almost Easy", artist = "Avenged Sevenfold")
nightmare = Song(title = "Nightmare", artist = "Avenged Sevenfold")
someday = Song(title = "Someday", artist = "Sugar Ray")
yesterday = Song(title = "Into Yesterday", artist = "Sugar Ray")

db.session.add_all([lying, end, almost, nightmare, someday, yesterday])
db.session.commit()

rock = Playlist(name = "Rock")
chill = Playlist(name = "Chill", description = "Good songs for chillaxin'")

db.session.add_all([rock, chill])
db.session.commit()

rock.add(lying)
rock.add(end)
rock.add(almost)
rock.add(nightmare)
chill.add(someday)
chill.add(yesterday)

db.session.add_all([rock, chill])
db.session.commit()
