### Conceptual Exercise

Answer the following questions below:

- What are important differences between Python and JavaScript?

In python, variables do not come in different types, they are all document-scoped, and do not require declaration, as JavaScript requires.  
Also, in python, the indentation has a function, and is not purely aesthetic. Brackets are not necessary to create blocks of code in python as they are in JS.
Python comes with the Python Standard library of modules, whereas JavaScript has external libraries which can be used, but no extra internal modules.  
A smaller difference is that python does not require parentheses in many cases where JavaScript does.
Python also supports tuples, and dictionaries support having any sort of data as keys, where in JS you would have to create a map. Lists can be created with list comprehensions in python, which is missing altogether from JS.  
For incompatible data, python raises errors, and JS just keeps going with that code not working. 

- Given a dictionary like ``{"a": 1, "b": 2}``: , list two ways you
  can try to get a missing key (like "c") *without* your programming
  crashing.

sample_dict = {"a": 1, "b": 2}
sample_dict.get('c')

try :
  c = sample_dict['c']
  return c
except KeyError :
  return None

- What is a unit test?

A unit test tests a particular function or peice of a program.

- What is an integration test?

An integration test tests if several functions which work together can do so successfully.

- What is the role of web application framework, like Flask?

Flask allows developers to easily write functions for URLs with simple commands and syntax instead of pythons complicated native ways.

- You can pass information to Flask either as a parameter in a route URL
  (like '/foods/pretzel') or using a URL query param (like
  'foods?type=pretzel'). How might you choose which one is a better fit
  for an application?

I would choose based on where the data comes from and what it is meant to accomplish. For searches, or any text based input which create a change on the following page, I would use a query parameter. For any whole new pages that I would like to show to the user, I would place the parameters in the URL.

- How do you collect data from a URL placeholder parameter using Flask?

The placeholder would be in greater than/less than signs, and I would call that data with the variable name I put as the placeholder.  
For http://URL.com/page<page_number>  
I would just use page_number.

- How do you collect data from the query string using Flask?

request.args['name of the query']

- How do you collect data from the body of the request using Flask?

I would give the data (presumably user input) a name in the page making the request, and include it in a form. Then call the data using request.form['name of the input'].

- What is a cookie and what kinds of things are they commonly used for?

Cookies are string data that is saved in the client side machine. They're used for keeping track of user data, like any preferences on the website, whether or not they have visited the website before, or what number of times they have visited. 

- What is the session object in Flask?

The session object is an object which persists across files that are used for a program, accessible like a dictionary. The session object is stored in the form of encrypted cookies. 

- What does Flask's `jsonify()` do?

jsonify turns the input data into a JSON format. Useful for APIs. 