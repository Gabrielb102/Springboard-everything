from app import app
from unittest import TestCase
from flask import session, flash
from help_functions import convert_currency
from forex_python.converter import CurrencyRates, CurrencyCodes


class ConverterTests(TestCase) :

    def test_show_homepage(self) :
        with app.test_client() as client :
            res = client.get('/')
            self.assertEqual(res.status_code, 200)
            self.assertIn("""<form action="/convert" method="GET">""", res.get_data(as_text=True))

    def test_load_conversion(self) :
        with app.test_client() as client :
            res = client.get('/convert?currency-in=USD&amount=1&currency-out=USD')
            self.assertEqual(res.status_code, 302)
            self.assertEqual(res.location, 'http://localhost/')
            self.assertEqual(session['output'], '$1 = $1.0')

    def test_convert_currency(self) :
        res = convert_currency('USD', '$', 1, 'USD','$')
        self.assertEqual(res, '$1 = $1.0')
            

