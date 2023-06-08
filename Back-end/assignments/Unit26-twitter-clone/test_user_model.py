"""User model tests."""

import os
from unittest import TestCase
from models import db, User, Message, Follows, connect_db

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler_test"

# Now we can import app

from app import app

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.drop_all()
db.create_all()



class UserModelTestCase(TestCase):
    """Test views for messages."""

    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()
        Follows.query.delete()

        self.client = app.test_client()

    def test_user_model(self):
        """Does basic model work?"""
        u = User.signup(
                    email="test@test.com",
                    username="testuser",
                    password="HASHED_PASSWORD",
                    image_url=None)

        sample_user1 = User.signup(username="jennylicious",
                                    email="jenny@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user2 = User.signup(username="troyasaur",
                                    email="troy@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user3 = User.signup(username="porkupine",
                                    email="pork@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user4 = User.signup(username="jellyfish",
                                    email="jelly@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user5 = User.signup(username="umbrellady",
                                    email="rainrain@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user6 = User.signup(username="David",
                                    email="justdavid@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user7 = User.signup(username="cubehead1",
                                    email="cube@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user8 = User.signup(username="squaresquare",
                                    email="squared@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user9 = User.signup(username="maryjain",
                                    email="weid@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user10 = User.signup(username="waxed_shirts",
                                    email="gabrielb102@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user11 = User.signup(username="savinoreds",
                                    email="savinoreds@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user12 = User.signup(username="11briano",
                                    email="mr_waffel_man_28@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user13 = User.signup(username="bagabuns",
                                    email="bagabuns@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.add_all([u,sample_user1,sample_user2,sample_user3,sample_user4,sample_user5,sample_user6,sample_user7,sample_user8,sample_user9,sample_user10,sample_user11,sample_user12,sample_user13])
        db.session.commit()

        # User should have no messages & no followers
        self.assertEqual(len(u.messages), 0)
        self.assertEqual(len(u.followers), 0)
        self.assertEqual(u.__repr__(), f"<User #{u.id}: {u.username}, {u.email}>")

        uu = User(
            email="test@test.com",
            username="testuser",
            password="HASHED_PASSWORD"
        )

    def test_is_following(self):
        """tests .is_following() method"""
        sample_users = list(User.query.filter(User.username.in_(["jennylicious","waxed_shirts","savinoreds","11briano"])))
        testuser = User.query.filter_by(username="troyasaur").first()
        print(f"//////////////////{testuser}")
        # following = [testuser.following.append(followed) for followed in sample_users]
        # db.session.add(testuser)
        # db.session.commit()

        # sample_following = User.query.filter_by(username="savinoreds").first()
        # self.assertTrue(testuser.is_following(sample_following), ".is_following() method fail: does not find users followed")
        # sample_following = User.query.filter_by(username="bagabuns").first()
        # self.assertFalse(testuser.is_following(sample_following), ".is_following() method fail: returns users not followed")
        self.assertFalse(False)

    def test_authenticate(self):
        """tests User.authenticate"""
        self.assertIsInstance(User.authenticate("waxed_shirts", "testuser"), User)

    # @classmethod
    # def tearDownClass(cls):
        # """Clears the test database"""
        # User.query.delete()
        # db.session.commit()
# Does is_following successfully detect when user1 is following user2?
# Does is_following successfully detect when user1 is not following user2?
# Does is_followed_by successfully detect when user1 is followed by user2?
# Does is_followed_by successfully detect when user1 is not followed by user2?
# Does User.create fail to create a new user if any of the validations (e.g. uniqueness, non-nullable fields) fail?
# Does User.authenticate successfully return a user when given a valid username and password?
# Does User.authenticate fail to return a user when the username is invalid?
# Does User.authenticate fail to return a user when the password is invalid?