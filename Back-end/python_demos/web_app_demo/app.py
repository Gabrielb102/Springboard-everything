from flask import Flask, request, render_template, redirect
from random import randint
app = Flask(__name__)

from flask_debugtoolbar import DebugToolbarExtension
app.config["SECRET_KEY"] = "surv"
debug = DebugToolbarExtension(app)

#The following lines show how to use the flask debug toolbar

@app.route("/")
def home_page() :
    html = """
        <html>
            <body>
                <h1>The Grand Home Page</h1>
                <a href="/hello"> Go to wassup page!</a>
            </body>
        </html>
    """
    return html

# the <> returns the contents as a VARIABLE, see heroterm referenced below!!
# use that for the subject of the page, for the navigation, for changing the page, keep using queries.
@app.route("/search/<heroterm>", methods=["GET"]) 
def search(heroterm) :
    """Provides a page which allows you to input your search terms"""
    q = request.args["q"]
    return(f"""
        <!DOCTYPE html>
        <html lang='en'>
        <body>
            <h1>Your {heroterm} search engine!</h1>
            <form method='POST'>
                <input placeholder='Comic Book' name='comic-book'>
                <input placeholder='Hero' name='hero'>
                <button>Submit</button>
            <form>
        </body>
        </html>
        """)

@app.route("/search", methods=["POST"]) 
def show() :
    """shows results using the values from the input forms in the search page"""
    #if these aren't found, python will throw an error
    #to avoid that, use request.form.get[""] or request.args.get[""]
    comic = request.form["comic-book"]
    hero = request.form["hero"]
    return(f"""
        <!DOCTYPE html>
        <html lang='en'>
        <body>
            <h4>Your favorite superhero is {hero} from {comic}!</h4>
        </body>
        </html>
        """)

#render_template() shown below will pull all the HTML from the spedified file,
# no import of the file necessary
@app.route("/hello")
def hello() :
    return render_template("hello.html")
    #hello.html inherited the navbar and footer from base.html

#Variables can be passed into render_templates after the html file, 
#and those variables can be used 
#by using {{this notation}} to escape HTML and be read as python        
@app.route("/horse")
def print_horse_prediction() :
    num = randint(1,9)
#you can't just pass in the variable,
#assign the var in the HTML to the value you got here
    return render_template("horse.html", horse_number = num)

@app.route("/form") 
def show_form() :
    return render_template("form.html")

@app.route("/greet")
def greet() :
    name = request.args["username"]
    return render_template("greet.html", name = name)

#the next two use looping and conditional logic
#check out the HTML
@app.route("/food_price")
def display_menu() :
    return render_template("food_price.html")

@app.route("/order_up")
def display_price_prediction() :
    food = request.args["food"]
    quantity = int(request.args["quantity"])
    return render_template("order_up.html", food = food, quantity = quantity)

#following uses base.html as a parent template

#redirecting

@app.route("/old_homepage")
def redirect_home() :
    """redirects to current homepage"""
    return redirect("/")

