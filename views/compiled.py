import math
import json
from flask import Flask, redirect, url_for, render_template, request

app = Flask(__name__)

# @app.route("/")
# def login():
# 	data = request.json
# 	return render_template("login.html"), data

# ### Can delete this block after JSON is fed in ###
# file = "templates/dj.json"

# with open(file) as f:
# 	data = json.loads(f.read())
# ### Can delete this block after JSON is fed in ###

def sortFunction(value):
	return value['name']



def dataManip(data):
	# data = sorted(data, key=sortFunction)
	length = len(data)
	j = []
	for k in range(len(data)):
		j.append(len(data[k]['measurements']))
	return data, length, j


def writeToFile(data):
	f = open("./test.txt", "w")
	f.write(data)
	f.close()
	return
@app.route("/patient")
def home():
	data = request.data
	data = data.decode("utf-8")
	data = json.loads(data)
	data = dataManip(data)
	return render_template("index.html", data=data[0], l=data[1], j=data[2])

# @app.route("/patient/<num>")
# def id_page(num):
# 	return render_template("patient.html", data=data[int(num)])

if __name__ == "__main__":
	app.run(debug=True)
