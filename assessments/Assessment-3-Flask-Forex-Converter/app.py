from flask import Flask, request, session, render_template, redirect, flash
from forex_python.converter import CurrencyRates, CurrencyCodes
from help_functions import convert_currency
app = Flask(__name__)

app.config['SECRET_KEY'] = "Moneyaintathingifyougotit"

currencies = list(CurrencyRates().get_rates('USD').keys())
currencies.append('USD')

@app.route('/')
def show_homepage() :
    """Shows homepage, which includes the input form and the previous conversion"""
    return render_template('homepage.html')

@app.route('/convert')
def load_conversion() :
    """loads the requested conversion, loads the result to the session, and returns to the root route again"""
    currency_in = request.args['currency-in'].upper()
    input_symbol = CurrencyCodes().get_symbol(f"{currency_in}")
    amount = int(request.args['amount'])
    currency_out = request.args['currency-out'].upper()
    output_symbol = CurrencyCodes().get_symbol(f"{currency_out}")

    conversion_string = convert_currency(currency_in, input_symbol, amount, currency_out, output_symbol)
    session['output'] = conversion_string

    return redirect('/')
