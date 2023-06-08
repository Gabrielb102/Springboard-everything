from boggle import Boggle
from time import sleep
from flask import Flask, request, session, render_template, redirect, flash

app = Flask(__name__)
boggle_game = Boggle()

app.config['SECRET_KEY'] = 'Ill_boggle_you_up'

@app.route('/')
def show_startpage() :
    session['times_played'] = 0
    session['high_score'] = 0
    return render_template("homepage.html")

@app.route('/start', methods=['POST'])
def build_gameboard() :
    board = boggle_game.make_board()
    session['board'] = board
    session['valid_words'] = []
    session['score'] = 0
    times_played = session['times_played']
    times_played += 1
    session['times_played'] = times_played
    return redirect('/gameboard')

@app.route('/gameboard')
def show_gameboard() :
    """Displays built gameboard"""
    board = session['board']
    return render_template('/gameboard.html', gameboard = board)

@app.route('/seen-word', methods=['POST'])
def register_word_guess() :
    word = request.form['word_guess']
    words = session['valid_words']
    score = session['score']
    if boggle_game.check_valid_word(session['board'], word) == "ok" :
        words.append(word)
        score += len(word)
        session['valid_words'] = words
        session['score'] = score
        if score > session['high_score'] :
            session['high_score'] = score
    else :
        message = boggle_game.check_valid_word(session['board'], word)
        flash(message)
    return redirect('/gameboard')