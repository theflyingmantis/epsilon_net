from flask import Flask, request, render_template, url_for, flash, redirect, session,make_response,jsonify
from functools import wraps,update_wrapper
import subprocess
from subprocess import *
import time

app = Flask(__name__, static_url_path='')
app.secret_key="secret"


@app.route("/")
def home():
	return render_template('web_app.html')

@app.route("/api",methods=['GET','POST'])
def api():
	if (request.method=='POST'):
		data = request.get_json()
		if (data['secret']=="epsilon_net"):
			point = []
			point.append("./epsilon.out")
			xpoint=data['random_points_x']
			ypoint=data['random_points_y']
			epsilon=data['epsilon']
			point.append(str(epsilon))
			for i in range(0,len(xpoint)):
				point.append(str(xpoint[i]))
				point.append(str(ypoint[i]))
			epsilon_net=check_output(point)
			time.sleep(0.5)
			print str(epsilon_net)
			data1={"epsilon_net":str(epsilon_net)}
			return jsonify(data1)

if __name__ == "__main__":
	app.run()