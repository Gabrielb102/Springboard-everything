from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle


class FlaskTests(TestCase):

    def setUp(self) :
        with app.test_client() as client :
            with client.session_transaction() as client_session :
                client_session['board'] = [['Z', 'D', 'K', 'P', 'D'], ['M', 'A', 'S', 'N', 'X'], ['T', 'D', 'N', 'U', 'X'], ['U', 'I', 'M', 'B', 'S'], ['V', 'R', 'Y', 'T', 'X']]
                client_session['valid_words'] = []
                print("SETUP")

    
    def tearDown(self) : 
        with app.test_client() as client :
            with client.session_transaction() as client_session :
                client_session['board'] = []
                client_session['valid_words'] = []
                print("TEARDOWN")


    def test_show_startpage(self) :
        with app.test_client() as client :
            res = client.get('/')
            self.assertEqual(res.status_code, 200)

    def test_build_gameboard(self) :
        with app.test_client() as client :
            res = client.post('/start')

            self.assertEqual(res.status_code, 302)
            self.assertIsInstance(session['board'], list)
            self.assertEqual(res.location, 'http://localhost/gameboard')

    def test_show_gameboard(self) :
        with app.test_client() as client :
            with client.session_transaction() as client_session :
                client_session['board'] = [['Z', 'D', 'K', 'P', 'D'], ['M', 'A', 'S', 'N', 'X'], ['T', 'D', 'N', 'U', 'X'], ['U', 'I', 'M', 'B', 'S'], ['V', 'R', 'Y', 'T', 'X']]
                client_session['valid_words'] = []
            res = client.get('/gameboard')
            html = res.get_data(as_text=True)
            self.assertEqual(res.headers['Content-length'], "3130")
            self.assertIn("Which words do you see?", html)

    def test_register_word_guess(self) :
        with app.test_client() as client :
            with client.session_transaction() as client_session :
                client_session['board'] = [['Z', 'D', 'K', 'P', 'D'], ['M', 'A', 'S', 'N', 'X'], ['T', 'D', 'N', 'U', 'X'], ['U', 'I', 'M', 'B', 'S'], ['V', 'R', 'Y', 'T', 'X']]
                client_session['valid_words'] = []
            res = client.post('/seen-word', follow_redirects=True, data={'word_guess': 'zymosimeter'})
            html = res.get_data(as_text=True)
            import pdb
            pdb.set_trace()
            self.assertIn("not-on-board", html)

            res = client.post('/seen-word', follow_redirects=True, data={'word_guess': 'thnyhjm'})
            html = res.get_data(as_text=True)
            self.assertIn("not-word", html)

            res = client.post('/seen-word', follow_redirects=True, data={'word_guess': 'rid'})
            html = res.get_data(as_text=True)
            self.assertIn('rid', session['valid_words'])
            self.assertEqual(res.status_code, 302)


