"""Message Model tests. See test_message_views.py or test_user_model.py for comments """

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

        db.session.commit()

    def test_message_model(self):
        """tests the message model"""

        user = User.query.get(self.testuser.id)
        
        message = Message(text="Hello", user_id=user.id)
        db.session.add(message)
        db.session.commit()

        self.assertEqual("Hello", message.text)
        self.assertEqual(user.id, message.author.id)

    def tearDown(self):
        """Erase test data"""

        User.query.delete()
        Message.query.delete()
        db.session.rollback()
