from flask import Flask, request, flash, request, render_template, redirect, session
from models import db, connect_db, User, Feedback
from forms import RegisterForm, LoginForm, FeedbackForm
from flask_bcrypt import Bcrypt

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret_key'
app.config["SQLALCHEMY_DATABASE_URI"] = "postgresql:///users"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

bcrypt = Bcrypt()
connect_db(app)

@app.route('/', methods=['GET'])
def show_menu() :
    """Show all navigation buttons"""
    return render_template('home.html')

@app.route('/register', methods=['GET', 'POST'])
def present_handle_registration() : 
    """Show a form that when submitted will register/create a user. 
    This form accepts a username, password, email, first_name, and last_name. 
    Redirect to user-only content if successful."""

    form = RegisterForm()
    if form.validate_on_submit() :
        user = User.register(
            username=form.username.data, 
            password=form.password.data, 
            email=form.email.data, 
            first_name=form.first_name.data, 
            last_name=form.last_name.data)

        db.session.add(user)
        db.session.commit()
        session["user_id"] = user.username
    
        return redirect(f'/users/{user.username}')
    else :
        return render_template('register.html', form=form)

@app.route('/login', methods=['GET', 'POST'])
def present_handle_login() :
    """Show a form that when submitted will login a user. 
    This form should accept a username and a password.
    Redirect to user-only content if successful."""
    # Make sure you are using WTForms and that your password input hides the characters that the user is typing!
    form = LoginForm()
    if form.validate_on_submit() :
        username = form.username.data
        if User.authenticate(username, password = form.password.data) :
            return redirect(f'users/{username}')
        else :
            flash('username or password incorrect')
            return redirect('/login')
    else :
        return render_template('login.html', form=form)

@app.route('/users/<username>', methods=['GET'])
def show_user_page(username):
    """If logged in, show user only content, otherwise redirect to homepage"""
    if "user_id" in session :
        user = User.query.get(username)
        user_feedback = user.feedback
        return render_template('userpage.html', user=user, user_feedback=user_feedback)
    else :
        return redirect('/')

@app.route('/logout', methods=['POST', 'GET'])
def log_user_out() :
    """logs users out of the session"""
    session.clear()
    return redirect('/')

@app.route('/users/<username>/delete', methods=['POST'])
def delete_user(username) :
    """Remove the user from the database and also deletes all of their feedback. 
    Clear any user information in the session and redirect to /."""
    user = User.query.get(username)
    if "user_id" in session :
        db.session.delete(user)
        db.session.commit()
        session.clear()
    else :
        flash('must be logged in to a user to delete the account')
    return redirect('/')
 
@app.route('/users/<username>/feedback/add', methods=['GET', 'POST'])
def display_and_handle_new_feedback_form(username) :
    """Display a form for a user to add feedback"""
    form = FeedbackForm()
    user = User.query.get(username)
    if form.validate_on_submit() :
        new_feedback = Feedback(
            title=form.title.data, 
            content=form.content.data, 
            username=username)
        db.session.add(new_feedback)
        db.session.commit()
        return redirect(f'/users/{session["user_id"]}')
    else :
        return render_template('feedback-new.html', form=form, user=user)

@app.route('/feedback/<feedback_id>', methods=['GET'])
def show_feedback(feedback_id) :
    """show the feedback with option to edit and delete"""
    feedback = Feedback.query.get(feedback_id)
    return render_template('feedback-show.html', feedback=feedback)

@app.route('/feedback/<feedback_id>/update', methods=['GET', 'POST'])
def edit_feedback(feedback_id) :
    """Display a form for the user of the feedback to edit feedback"""
    form = FeedbackForm()
    feedback = Feedback.query.get(feedback_id)
    user = User.query.get(session["user_id"])
    if form.validate_on_submit() :
        if Feedback.authenticate(username = session["user_id"], feedback = feedback) :
            feedback.title = form.title.data
            feedback.content = form.content.data

            db.session.add(feedback)
            db.session.commit()
            return redirect(f'/users/{session["user_id"]}')
        else :
            flash('only the author can make changes to feedback')
            return redirect(f'/users/{session["user_id"]}')
    else :
        form.title.data = feedback.title
        form.content.data = feedback.content
        return render_template('feedback-edit.html', form=form, user=user, feedback=feedback)

@app.route('/feedback/<feedback_id>/delete', methods=['POST'])
def delete_feedback(feedback_id) :
    """Delete a specific piece of feedback and redirect to /users/<username>"""
    feedback = Feedback.query.get(feedback_id)
    db.session.delete(feedback)
    db.session.commit()
    return redirect(f'/users/{session["user_id"]}')
