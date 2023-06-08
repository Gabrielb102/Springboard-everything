from app import app
from unittest import TestCase

class Route_tests(TestCase) :
    def test_homepage(self) :
        """ will test if the homepage route functions correctly, "client" is set to represent the client experience"""
        with app.test_client() as client :
            #great way to see what exaclty you have access to with .test_client()
            import pdb
            pdb.set_trace() #opens program with debugger and allows you to manipulate with terminal
            #dir(self) to see options for client (terminal)
            res = client.get("/")
            #dir(res) to see options for responses (terminal)
            