import math
import seaborn as sns
import matplotlib.pyplot as plt
from flask import Flask, redirect, url_for, render_template

# patients = [['324009725', 'Kyle', 'Brim', '21 Aug 1997', 'Male',
# 			 '177 lbs', 'McKinney, TX'],
# 			['123001234', 'Yazan', 'Abuashour', '1 Jan 1990',
# 			 'Non-binary', '365 lbs', 'Compton, CA'],
# 			['456009898', 'Lauren', 'Yamthe', '31 Oct 1969',
# 			 'Female', '112 lbs', 'Houston, TX'],
# 			['909009009', 'Haani', 'Tai', '25 Dec 2000',
# 			 'Gender Fluid', '225 lbs', 'New York, NY'],
# 			['123009999', 'Hannah', 'McKinley', '31 Oct 2020',
# 			 'Mustang', '7 lbs', 'Tampa, FL'],
# 			['888008888', 'Michael', 'Guillen', '29 Feb 1999',
# 			 'Often', '800 lbs', 'City, ST']]
patients = [['324009725', 'Kyle Brim', '110 Waverly Dr',
			 '2145514496', '21 Aug 1997', 'True', 'Male',
			 'Single', 'White'],
			 ['123001234', 'Yazab Abuashour', '1600 Pennsylvania Ave',
			  '8320001111', '1 Jan 1900', 'False', 'Shemale',
			  'Polyamorous', 'French']]
length = len(patients)

test_cl = [[33, 32, 31, 36, 37, 36, 32, 31, 30, 30, 33],
		   [30, 30, 30, 30, 31, 31, 32, 32, 33, 33, 33]]
# m = []
# for c in range(len(test_cl)):
# 	m.append(c)

# fig = sns.lineplot(x=m, y=test_cl,
# 	               color='blue')
# fig.set_ylim(0, 40)

app = Flask(__name__)

@app.route("/")
def login():
	data = request.json
	return render_template("login.html")

@app.route("/patient")
def home():
	return render_template("index.html", id=patients, l=length)

@app.route("/patient/<id>")
def id_page(id):
	return render_template("patient.html", id=patients[int(id)], sp=id, data=test_cl[int(id)])

if __name__ == "__main__":
	app.run(debug=True)

