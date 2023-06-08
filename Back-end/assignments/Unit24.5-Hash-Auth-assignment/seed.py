from app import app
from models import db, User, Feedback


db.drop_all()
db.create_all()

gingy = User.register(username = "gingy", password = "fiona", email = "gingy@bakerslane.com", first_name = "Gingerbread", last_name = "Man")
farquaad = User.register(username = "farquaad", password = "fiona", email = "farquaad@farquaad.com", first_name = "Lord", last_name = "Farquaad")
shrek = User.register(username = "shrek", password = "fiona", email = "shrek@farfaraway.com", first_name = "Shrek", last_name = "Swampson")
muffinman = User.register(username = "muffinman", password = "fiona", email = "muffinman@bakerslane.com", first_name = "Muffin", last_name = "Man")

db.session.add_all([gingy, farquaad, shrek, muffinman])
db.session.commit()

swamp = Feedback(title = "Flask in MY SWAMP", content = """There is just too much Flask in my swamp! And I'm wondering, 
    why does it need to be there? I worked to hard to protect this swamp, and I don't even want it to interact with the internet. 
    I am the last person to make HTTP requests. This is nonsense.""", username = "shrek")
cleared = Feedback(title = "No more Flask in my Swamp", content = """So I did it :). While Fiona was in the house burping the kids and 
    so on, I went out to clear all the flask out of my swamp. My swamp is now the furthest thing from a web application. And that's the way 
    I like it. Then something strange started happening. All these fairytale creatures started appearing. I don't know where they came from! 
    I can never get peace in my swamp!""", username = "shrek")
cookies = Feedback(title = "Flask is Hard", content = """Learning Flask is as hard as week old dough! My gingerbread men never come out this
    hard, they are always made with the softest dough (for gingerbread), and they never last long enough for them to become brittle!""",
     username = "muffinman")
lorem = Feedback(title = "Lorem", content = "Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem Lorem", username = "farquaad")
fairytale = Feedback(title = "No more Fairytales!", content = """Fairytales are so antiquated, and they're goofy. The kingdom of 
    DuLoc will not shelter these freakshows. We will only house civilized folk of human descent. It will be a party, a festival, 
    all the time! And there will be Flask all over the place!""", username = "farquaad")
ogre = Feedback(title = "An OGRE", content = """For a while, I have needed a princes to make my queen so that I may rule my kingdom.
    As saving her myself would put me in peril, and possibly relinquish me of the priviledge of living my awesome life and ruling the 
    great treasure that is DuLoc, I have decided to select a champion to save her in my stead from her prison. The tournament was held
     today in the arena, and one knight simply trounced the competition, he seemed up to the task to say the least. However, when he bared 
     his face, the revealed himself to be nothing more than a stinky OGRE. I sent him, after all, if he dies, there is one less ogre in 
     the world""", username = "farquaad")
princess = Feedback(title = "He did it!", content = """The ogre came back with my princess! I suppose I will give him his swamp back
    after all. I sent the men to evict the fairytale people even further away""", username = "farquaad")

db.session.add_all([swamp, cleared, cookies, lorem, fairytale, ogre, princess])
db.session.commit()