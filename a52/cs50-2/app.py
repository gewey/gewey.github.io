# application.py
import datetime

from flask import Flask, render_template, request, session
from flask_session import Session

app = Flask(__name__)

app.config["SESSION_PERMANENT"] = False
app.config["SESSION_TYPE"] = "filesystem"
Session(app)

notes = []

@app.route("/", methods=["GET", "POST"])
def index():
	headline = "Hello, world!"
	now = datetime.datetime.now()
	new_year = now.month == 1 and now.day == 1
	names = ["Alice", "Bob", "Charlie"]
	if request.method == "POST":
		note = request.form.get("note")
		notes.append (note)

	return render_template(
		"index.html", 
		headline=headline, 
		new_year=new_year,
		names=names,
		notes=notes
		)

@app.route("/more")
def more():
	return render_template("more.html")

@app.route("/hello", methods=["POST"])
def hello():
	name = request.form.get("name")
	return render_template("hello.html", name=name)

# @app.route("/")
# def index():
# 	return "Hello, world!?!!!!"

# @app.route("/<string:name>")
# def hello(name):
# 	name = name.capitalize()
# 	return f"Hello, {name}!"

