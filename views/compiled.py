import math
import json
from flask import Flask, redirect, url_for, render_template

app = Flask(__name__)

@app.route("/")
def login():
	# data = request.json
	return render_template("login.html") #, data

### Can delete this block after JSON is fed in ###
file = "templates/dj.json"

with open(file) as f:
	data = json.loads(f.read())
### Can delete this block after JSON is fed in ###

def sortFunction(value):
	return value['name']

data = sorted(data, key=sortFunction)
length = len(data)
j = []
for k in range(len(data)):
	j.append(len(data[k]['measurements']))

@app.route("/patient")
def home():
	return render_template("index.html", data=data, l=length, j=j)

@app.route("/patient/<num>")
def id_page(num):
	return render_template("patient.html", data=data[int(num)])

if __name__ == "__main__":
	app.run(debug=True)
