from unittest import TestCase
from app import app
from models import db, User
from forms import RegisterForm, LoginForm
from flask_bcrypt import Bcrypt

# Use test database and don't clutter tests with SQL
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql:///users_test'
app.config['WTF_CSRF_ENABLED'] = False
app.config['SQLALCHEMY_ECHO'] = False
app.config['TESTING'] = True
bcrypt = Bcrypt()

db.drop_all()
db.create_all()


class UserSiteViewsTestCase(TestCase):
    """Tests for views of UserSite."""

    # def setUp(self):
    #     """APPLIES BEFORE EACH TEST"""

    #     User.query.delete()

    #     NEWMODELINSTANCEFORTEST = MODEL(INSTANCE_DATA)
    #     db.session.add(THEINSTANCE)
    #     db.session.commit()

    #     self.cupcake = cupcake

    # def tearDown(self):
    #     """APPLIES AFTER EACH TEST"""

    #     db.session.rollback()
    #     user_list = list(User.query.all())
    #     db.session.delete_all(user_list)

    def register_test(self):
        with app.test_client() as client:
            d = {"username":"BobtheBuilder666", "password":"passwordlol", "email":"BobtheBuilder666@gmail.com", "first_name":"Bob", "last_name":"LeBuilder"}

            resp = client.post("/register", data=d, follow_redirects=True)
            user = User.query.get("BobtheBuilder666")

            hashed = bcrypt.generate_password_hash("passwordlol")

            self.assertIsInstance(user, User)
            self.assertTrue(bcrypt.check_password_hash(user.password, hashed))

    def login_test(self):
        with app.test_client() as client:
            d = {"username":"BobtheBuilder666", "password":"passwordlol"}
            f = {"username":"BobtheBuilder666", "password":"passwordl0l"}
            u = {"username":"BobtheBuilder777", "password":"passwordlol"}

            resp = client.post("/register", data=d, follow_redirects=True)
            user = User.query.get("BobtheBuilder666")

            hashed = bcrypt.generate_password_hash("passwordlol")
            self.assertTrue(bcrypt.check_password_hash(user.password, hashed))

    # def userpage_test(self):
    #     with app.test_client() as client:
    #         resp