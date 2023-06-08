"""Madlibs Stories."""
from flask import Flask, request, render_template
app = Flask(__name__)
class Story:
    """Madlibs story.

    To  make a story, pass a list of prompts, and the text
    of the template.

        >>> s = Story(["noun", "verb"],
        ...     "I love to {verb} a good {noun}.")

    To generate text from a story, pass in a dictionary-like thing
    of {prompt: answer, promp:answer):

        >>> ans = {"verb": "eat", "noun": "mango"}
        >>> s.generate(ans)
        'I love to eat a good mango.'
    """

    def __init__(self, words, text):
        """Create story with words and template text."""

        self.prompts = words
        self.template = text

    def generate(self, answers):
        """Substitute answers into text."""

        text = self.template

        for (key, val) in answers.items():
            text = text.replace("{" + key + "}", val)

        return text


# Here's a story to get you started


story = Story(
    ["place", "noun", "verb", "adjective", "plural_noun"],
    """Once upon a time in a long-ago {place}, there lived a
       large {adjective} {noun}. It loved to {verb} {plural_noun}."""
)

@app.route("/prompt_form")
def show_form() :
    prompt_entries = []
    for prompt in story.prompts :
        prompt_entries.append(f"""<li> {prompt} 
                                <input type='text' name='{prompt}'> 
                            </li>""") 
    return render_template("prompt_form.html", prompts = prompt_entries)

@app.route("/story")
def show_story() :
    answers = {}
    for prompt in story.prompts :
        answers[f"{prompt}"] = request.args[f"{prompt}"]
    madlib = story.generate(answers)
    return render_template("story.html", madlib = madlib)