import flask
from flask import request, jsonify
import json
import csv

from fb_events_crawler_engine import main

app = flask.Flask(__name__)
app.config["DEBUG"] = True

@app.route('/', methods=['GET'])
def home():
	return "<h>Facebook events crawler</h><p> This is a demo</p>"


@app.route('/api/v1', methods=['GET'])
def api_start_crawler():
	""" Take required parameters from user,
		Country, City, year, month, day. And push them to the crawler.
		Finally, the crawler starts.
	
	"""
	# mandatory parameters
	params = {"country", "city", "y", "m", "d"} #, pagination}
	for p in params:
		if p not in request.args:
			return "Error: missing parameters."
	
	"""
		### Prerequisites ###
	"""

	country = request.args["country"].strip()
	city = request.args["city"].strip()
	y = int(request.args["y"])
	m = int(request.args["m"])
	d = int(request.args["d"])

	try:
		pag_thrld = int(request.args["pagination"])
	except:
		# max pagination_threshold value
		pag_thrld = 100


	# fetch credentials 
	try:
		with open('credentials.csv', 'r') as f:
			_creds = f.read().strip().split(',')
	except:
		return "Error: corrupted credentials."


	# lookup in cities to get the required city_id
	with open('cities.json', 'r') as f:
		cities = json.load(f)


	# lookup
	try:
		city_id = cities["{}, {}".format(city, country)]
	except KeyError:
		return "Error: invalid location, or city_id not found."
 	

	try:
		output = []

		# pass parameters to the crawler engine
		output = main(_username=_creds[0],
			_password=_creds[1],
			city_id=city_id,
			year=y,
			month=m,
			day=d,
			pagination_threshold=pag_thrld)
		
		# wite last output to the disk
		with open('events.csv', 'w') as f:
			wr = csv.writer(f, quoting=csv.QUOTE_ALL)
			wr.writerow(output)
	finally:
		return jsonify(output) 

app.run()
