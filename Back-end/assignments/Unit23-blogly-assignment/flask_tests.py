from unittest import TestCase
from app import app
from flask import request
from models import db, User

app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///blogly_test'
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True

db.drop_all()
db.create_all()

class BloglyAppTestCase(TestCase) :
    """Tests for Blogly App"""
    
    def test_submit_new_user_form(self) :
        """tests new user creation"""
        with app.test_client() as client :
            expected_total_entries = len(list(User.query.all())) + 1
            d = {"first_name": "George", "last_name": "Washington", "image_url": "https://static01.nyt.com/images/2021/05/13/us/13xp-georgewashington-1/13xp-georgewashington-1-superJumbo.jpg"}
            response = client.post("/users/new", data=d, follow_redirects=True)
            db_output = User.query.filter_by(first_name="George").first_name
            self.assertEqual(db_output.first_name, "George")
            self.assertEqual(db_output.id, expected_total_entries)


    def test_show_users(self) :
        """tests view function for /users"""
        with app.test_client() as client :
            response = client.get("/users")
            html = response.get_data(as_text=True)
            self.assertIn("see", html)

    def test_submit_user_edits(self) :
        """tests user editing form"""
        with app.test_client() as client :
            current_total_entries = len(list(User.query.all()))
            d = {"first_name": "George", "last_name": "Winterbottom", "image.url": "https://static01.nyt.com/images/2021/05/13/us/13xp-georgewashington-1/13xp-georgewashington-1-superJumbo.jpg"}
            response = client.post("/users/1/edit", data=d, follow_redirects=True)
            new_total_entries = len(list(Users.query.all()))
            new_last_name = Users.query.get(1).last_name
            self.assertEqual(current_total_entries, new_total_entries)
            self.assertEqual(new_last_name, "Winterbottom")

    def test_delete_user(self) :
        """tests user deletion"""
        with app.test_client() as client :
            current_total_entries = len(list(User.query.all()))
            response = client.post("/users/1/delete")
            new_total_entries = len(list(Users.query.all()))
            new_total_entries += 1
            self.assertEqual(current_total_entries, new_total_entries)

            