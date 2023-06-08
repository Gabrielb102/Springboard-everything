"""User view function tests. See test_message_views.py or test_user_model.py for comments """

import os
from unittest import TestCase

from models import db, connect_db, Message, User

os.environ['DATABASE_URL'] = "postgresql:///warbler_test"

from app import app, CURR_USER_KEY

db.drop_all()
db.create_all()

app.config['WTF_CSRF_ENABLED'] = False


class MessageModelTestCase(TestCase):
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

        sample_user1 = User.signup(username="jennylicious",
                                    email="jenny@test.com",
                                    password="testuser",
                                    image_url=None)

        sample_user2 = User.signup(username="troyasaur",
                                    email="troy@test.com",
                                    password="testuser",
                                    image_url=None)

        db.session.commit()

    def test_uses_show(self):
        """Test users_show() view function which lists all users"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

            resp = c.get(f"/users")
        
        self.assertEqual(resp.status_code, 200)
        self.assertIn("jennylicious", resp.text)
        self.assertIn("troyasaur", resp.text)

        resp = c.get(f"/users", data={"q":"jenny"})

        self.assertIn("jennylicious", resp.text)
    

    def test_show_following(self):
        """Test show_following() view function which lists all followed users"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        user = User.query.get(self.testuser.id)
        user_to_follow = User.query.filter_by(username="jennylicious").first()
        user.following.append(user_to_follow)

        db.session.add(user)
        db.session.commit()

        resp = c.get(f"/users/{self.testuser.id}/following", follow_redirects=True)

        self.assertEqual(resp.status_code, 200)
        self.assertIn("jennylicious", resp.text)
        self.assertNotIn("troyasaur", resp.text)
 

    def test_show_following(self):
        """Test show_following() view function which lists all followed users"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        user = User.query.get(self.testuser.id)
        follower = User.query.filter_by(username="troyasaur").first()
        user.followers.append(follower)

        db.session.add(user)
        db.session.commit()

        resp = c.get(f"/users/{self.testuser.id}/followers", follow_redirects=True)
   
        self.assertEqual(resp.status_code, 200)
        self.assertNotIn("jennylicious", resp.text)
        self.assertIn("troyasaur", resp.text)


    def test_add_follow(self):
        """Test add_follow() which adds a followed user to a user's list of followed users"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        user_to_follow = User.query.filter_by(username="jennylicious").first()
        resp = c.post(f"/users/follow/{user_to_follow.id}", follow_redirects=True)
        
        self.assertEqual(resp.status_code, 200)
        self.assertIn("jennylicious", resp.text)
        self.assertNotIn("troyasaur", resp.text)

    def test_stop_following(self):
        """Test stop_following(), which removes a user from the current users list of followed users"""
        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        user = User.query.get(self.testuser.id)
        following = User.query.filter_by(username="jennylicious").first()
        user.following.append(following)

        db.session.add(user)
        db.session.commit()

        resp = c.post(f"users/stop-following/{following.id}")
        user = User.query.get(self.testuser.id)

        self.assertEqual(len(user.following), 0)

    def test_edit_profile(self):
        """Tests edit_profile() view function which both presents
        user edit form and submits the changes"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        resp = c.get("/users/profile")

        self.assertIn("Location", resp.text)
        self.assertIn("Bio", resp.text)

        resp = c.post("/users/profile", data={
            "username":self.testuser.username,
            "bio":"Chillin in Cedar Rapids",
            "location":"Cedar Rapids",
            "email""":self.testuser.email,
            "image_url":self.testuser.image_url,
            "password":"testuser"
            })

        user = User.query.get(self.testuser.id)

        self.assertEqual(user.bio, "Chillin in Cedar Rapids")

    def test_delete_user(self):
        """Tests delete_user() view function which deletes a user"""

        with self.client as c:
            with c.session_transaction() as sess:
                sess[CURR_USER_KEY] = self.testuser.id

        resp = c.post("/users/delete")

        self.assertIsNone(User.query.get(self.testuser.id))
        self.assertEqual(resp.status_code, 302)

        


