"""Seed file to make sample data for pets db."""

from models import User, Post, Tag, PostTag, db
from app import app

# Create all tables
db.drop_all()
db.create_all()

# If table isn't empty, empty it
User.query.delete()
Post.query.delete()

kennedy = User(first_name="John", last_name="Adams", image_url="https://www.history.com/.image/ar_16:9%2Cc_fill%2Ccs_srgb%2Cfl_progressive%2Cg_faces:center%2Cq_auto:good%2Cw_768/MTc1MDcyMzk4NTkxMTQxNjc1/john-adams-gettyimages-72385390.jpg")
obama = User(first_name="Barack", last_name="Obama", image_url="https://www.thoughtco.com/thmb/jxxLoYLV1bxkImEGnyNVaz8_t_M=/1024x683/filters:fill(auto,1)/BarackObama-799035cd446c443fb392110c01768ed0.jpg")
wash = User(first_name="George", last_name="Washington", image_url = "https://static01.nyt.com/images/2021/05/13/us/13xp-georgewashington-1/13xp-georgewashington-1-superJumbo.jpg")
ike = User(first_name="Dwight", last_name="Eisenhower", image_url="https://obamawhitehouse.archives.gov/sites/whitehouse.gov/files/images/first-family/34_dwight_d_eisenhower%5B1%5D.jpg")
lincoln = User(first_name="Abraham", last_name="Lincoln", image_url='http://127.0.0.1:5000/static/default-profile-pic.png')
trump = User(first_name="Donald", last_name="Trump", image_url='http://127.0.0.1:5000/static/default-profile-pic.png')

db.session.add_all([kennedy, obama, wash, ike, lincoln, trump])
db.session.commit()

guten = Post(title='Good times in Gutenberg, Germany', content='''We stay
    ed in Gutenberg today in a hostel, but we had no idea what a hostel was 
    before we got there. Apparently, staying in a hostel is like a sleepover
    with total strangers! Those strangers ended up being really cool people 
    and we enjoyed our stay there even more because of them. Guten berg itse
    lf was a lot of fun also. It was so much fun actually, that we cancelled
    our American citizenship and are applying to be real Germans!! After th
    is post, were also forgetting all the english we ever knew. Auf Weiderse
    n!!''', user_id=3)

sotu = Post(title='SOTU', content='''Mr. Speaker, Mr. Vice President, Members of Congress, my fellow Americans: 
    Tonight marks the eighth year I've come here to report on the State of the Union. And for this final one, 
    I'm going to try to make it shorter. I know some of you are antsy to get back to Iowa. 
    I also understand that because it's an election season, expectations for what we'll achieve this year are low. 
    Still, Mr. Speaker, I appreciate the constructive approach you and the other leaders took at the end of last year to pass a budget and make tax cuts permanent for working families. 
    So I hope we can work together this year on bipartisan priorities like criminal justice reform, and helping people who are battling prescription drug abuse. 
    We just might surprise the cynics again. 
    But tonight, I want to go easy on the traditional list of proposals for the year ahead. Don't worry, I've got plenty, 
    from helping students learn to write computer code to personalizing medical treatments for patients. 
    And I'll keep pushing for progress on the work that still needs doing. Fixing a broken immigration system. Protecting our kids from gun violence. 
    Equal pay for equal work, paid leave, raising the minimum wage. 
    All these things still matter to hardworking families; they are still the right thing to do; and I will not let up until they get done.''', user_id=2)

gettys = Post(title='Gettysburg Address', content='''Four score and seven years ago our fathers brought forth, 
    upon this continent, a new nation, conceived in liberty, and dedicated to the proposition that all men are created equal.
    Now we are engaged in a great civil war, testing whether that nation, or any nation so conceived, and so dedicated, 
    can long endure. We are met on a great battle field of that war. We come to dedicate a portion of it, 
    as a final resting place for those who died here, that the nation might live. This we may, in all propriety do.
    But, in a larger sense, we can not dedicate we can not consecrate we can not hallow, this ground The brave men, 
    living and dead, who struggled here, have hallowed it, far above our poor power to add or detract. 
    The world will little note, nor long remember what we say here; while it can never forget what they did here.
    It is rather for us, the living, we here be dedicated to the great task remaining before us that, from these honored dead 
    we take increased devotion to that .cause for which they here, gave the last full measure of devotion that we 
    here highly resolve these dead shall not have died in vain; that the nation, shall have a new birth of freedom, 
    and that government of the people, by the people, for the people, shall not perish from the earth.''', user_id=5)

db.session.add_all([sotu, gettys, guten])
db.session.commit()

story = Tag(tag="story")
issues = Tag(tag="issues")
usa = Tag(tag="usa")
war = Tag(tag="war")
civilwar = Tag(tag="civilwar")
un = Tag(tag="un")
europe = Tag(tag="europe")

gettys.tags.append(usa)
gettys.tags.append(civilwar)
gettys.tags.append(war)
sotu.tags.append(issues)
sotu.tags.append(usa)
guten.tags.append(un)

db.session.add_all([story, usa, un, europe, war, civilwar, issues, gettys, sotu, guten])
db.session.commit()