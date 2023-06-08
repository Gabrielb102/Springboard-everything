from flask import Flask, request
import operations
app = Flask(__name__)

@app.route("/add")
def adding() :
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.add(a, b))

@app.route("/sub")
def subtract() :
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.sub(a, b))

@app.route("/mult")
def multiply() :
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.mult(a, b))
@app.route("/div")
def divide() :
    a = int(request.args["a"])
    b = int(request.args["b"])
    return str(operations.div(a, b))