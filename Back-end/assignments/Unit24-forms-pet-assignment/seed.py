from models import Pet, db
from app import app

# Create all tables
db.session.rollback()
db.drop_all()
db.create_all()

wald = Pet(
    name="Waldo",
    species="Shih-tzu",
    age=14,
    notes="""this is the best boy ever, he's fourteen and doesn't look a d
    ay over four, he is a little blind though haha, his senses are disappear
    ing but it's never changed how great his is. I love Waldo."""
)

tory = Pet(
    name="Johnson",
    species="British",
    age=45,
    notes="""A regular blonde British Rascal. When blonde fuckups were in fashion in world leadership
    Johnson was in high demand. He was everything you could want, radical, brash, oblivious, crazy
    looking, what more could you want?"""
) 

scoob = Pet(
    name="Scooby-Doo",
    species="Great Dane",
    age=60,
    notes="""While portrayed as very silly and dumb, Scoob is on the verge of speaking on his own! 
    This dog can solve mysteries almost on his own, and will star in his own cartoon series before
    your very eyes! He will foil plans though, so be careful with this guy!"""
)

target = Pet(
    name="Spot",
    species="Bull Terrier",
    age=10,
    notes="""This is the boyo from the target commercials. He has that peculiar red bulls-eye over
    his eye, and can show you where to find anything down any isle in any target!"""
)

db.session.add_all([wald,tory,scoob,target])
db.session.commit()