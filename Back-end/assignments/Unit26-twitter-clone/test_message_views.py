"""Message View tests."""

# run these tests like:
#
#    FLASK_ENV=production python -m unittest test_message_views.py


import os
from unittest import TestCase

from models import db, connect_db, Message, User

# BEFORE we import our app, let's set an environmental variable
# to use a different database for tests (we need to do this
# before we import our app, since that will have already
# connected to the database

os.environ['DATABASE_URL'] = "postgresql:///warbler_test"


# Now we can import app

from app import app, CURR_USER_KEY

# Create our tables (we do this here, so we only create the tables
# once for all tests --- in each test, we'll delete the data
# and create fresh new clean test data

db.drop_all()
db.create_all()

# Don't have WTForms use CSRF at all, since it's a pain to test

app.config['WTF_CSRF_ENABLED'] = False


class MessageViewTestCase(TestCase):
    """Test views for messages."""


    def setUp(self):
        """Create test client, add sample data."""

        User.query.delete()
        Message.query.delete()

        self.client = app.test_client()

        self.testuser = User.signup(username="testuser",
                                    email="test@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_add_message(self):
        """Tests add_message(), which creates a new message in the current user's name"""

        # Since we need to change the session to mimic logging in,
        # we need to use the changing-session trick:

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            # Now, that session setting is saved, so we can have
            # the rest of ours test

            resp = c.post("/messages/new", data={"text": "Hello"})

            # Make sure it redirects
            self.assertEqual(resp.status_code, 302)

            msg = Message.query.one()
            self.assertEqual(msg.text, "Hello")

            self.assertEqual(msg.user_id, self.testuser.id)

    def test_messages_show(self):
        """Tests view function messages_show(), which shows a page with one message"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            post = c.post("/messages/new", data={"text": "Hello"})
            message = Message.query.first()
            message_id = message.id
            resp = c.get(f"/messages/{message_id}")
            
            self.assertIn("Hello", resp.text)
            self.assertEqual(resp.status_code, 200)

    def test_messages_destroy(self):
        """Tests view function add_like(), which deletes a message if the author is logged in"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            post = c.post("/messages/new", data={"text": "Hello"})
            message = Message.query.first()
            message_id = message.id
            resp = c.post(f"/messages/{message_id}/delete")
            
            self.assertIsNone(Message.query.get(message_id))
            self.assertEqual(resp.status_code, 302)

            post = c.post("/messages/new", data={"text": "Hello"})
            message = Message.query.first()
            message_id = message.id

            with c.session_transaction() as sess:
                sess.clear()

            resp = c.post(f"/messages/{message_id}/delete", follow_redirects=True)
            self.assertIn("Access unauthorized", resp.text)

    def test_add_like_and_unlike(self):
        """Tests view function add_like() and un_like(), which adds a like to the message from the current user
        and removes a like from a message, respectively"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            post = c.post("/messages/new", data={"text": "Hello"})
            message = Message.query.first()
            message_id = message.id
            resp = c.post(f"/users/add_like/{message_id}")
            user = User.query.get(self.testuser.id)
            
            self.assertEqual(len(user.likes), 1)
            self.assertEqual(resp.status_code, 302)

            resp = c.post(f"/users/un_like/{message_id}")
            user = User.query.get(self.testuser.id)

            self.assertEqual(len(user.likes), 0)
            self.assertEqual(resp.status_code, 302)

    def tearDown(self):
        """Removes changes made to the test server for testing"""

        User.query.delete()
        Message.query.delete()