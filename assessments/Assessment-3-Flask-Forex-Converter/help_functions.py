from forex_python.converter import CurrencyRates, CurrencyCodes
from flask import Flask, request, session, render_template, redirect, flash

currencies = list(CurrencyRates().get_rates('USD').keys())
currencies.append('USD')

def convert_currency(currency_in, input_symbol, amount, currency_out, output_symbol) :
        error = False
        if not currency_in in currencies :
            error = True
            flash('Invalid Input Currency')
        if not currency_out in currencies : 
            error = True
            flash('Invalid Output Currency')
        if amount < 0 :
            error = True
            flash("Amount must be positive")
        if error == True :
            session['output'] = ''
            return redirect('/')
        result = round(CurrencyRates().convert(currency_in, currency_out, amount), 2)
        conversion_string = input_symbol + str(amount) + " = " + output_symbol + str(result)
        return conversion_string