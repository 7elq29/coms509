from flask import Flask, request
from flask import Response
from flaskext.mysql import MySQL
from flask import jsonify
from flask_cors import CORS, cross_origin
import json
import datetime
import pytz

app = Flask(__name__)
mysql = MySQL()
CORS(app)
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'dbu509t04'
app.config['MYSQL_DATABASE_PASSWORD'] = 't@haYu3up@qu'
app.config['MYSQL_DATABASE_DB'] = 'db509t04'
app.config['MYSQL_DATABASE_HOST'] = 'mysql-509.cs.iastate.edu'

mysql.init_app(app)

GMT = pytz.timezone('America/Chicago')

@app.route('/')
def hello_world():
	return "server side"

@app.route('/login')
def longinValid():
	res = {"status":"success","message":"longin success"}
	return jsonify(**res)

@app.route('/search', methods=['GET', 'POST'])
def searchData():
	if request.method == 'POST':
		data = request.data
		dataDict = json.loads(data)
		keyWord = dataDict["keyword"]
		cur = mysql.connect().cursor()
		cur.execute("select patient.PNAME, patient.MRID from patient where patient.`PNAME` like %s", [keyWord])
		rv = cur.fetchall();
		resList = []
		for row in rv:
			item = {'patientName':row[0],'MRNo':row[1]}
			resList.append(item)
		res = {'result':resList}
		return jsonify(**res)
	else:
		res = {'result':{}}
		return jsonify(**res)

@app.route('/searchByMR/<int:mrid>',methods=['GET', 'POST'])
def searchByMR(mrid):
	if request.method == 'GET':
		print "mrid:"+str(mrid)
		startTime = request.args.get("starttime")
		endTime = request.args.get("endtime")
		cur = mysql.connect().cursor()
		if startTime and endTime:
			startT = datetime.datetime.fromtimestamp(float(startTime))
			endT = datetime.datetime.fromtimestamp(float(endTime))
			cur.execute("select * from test, merit, patient where test.MRID = patient.MRID and test.MID = merit.MID and patient.MRID = %s and test.DATE >=%s and test.DATE<=%s",[mrid,startT,endT])
		else :
			cur.execute("select * from test, merit, patient where test.MRID = patient.MRID and test.MID = merit.MID and patient.MRID = %s ",[mrid])
		rv = cur.fetchall();
		if(len(rv) == 0) :
			return Response(status=404)

		patientName = ""
		ownerName = ""
		resList = []
		for row in rv:
			patientNme = row[12]
			ownerName = row[13]
			item = {'testAbbr':row[7],'unit':row[8],'value':row[4],'time':row[2]}
			resList.append(item)
		res = {'MRNo':mrid,'patientName':patientNme,'ownerName':ownerName,'tests':resList}
		return jsonify(**res)
	else: 
		return Response(status=404)

@app.route('/add/<int:mrid>',methods=['GET', 'POST','PUT'])
def addRecord(mrid):
	if request.method == 'PUT':
		data = request.data
		dataDict = json.loads(data)
		dataList = dataDict["test"]
		con = mysql.get_db()
		cur = con.cursor()
		cur.execute("select count(*) from patient where patient.MRID = %s",[mrid])
		count = cur.fetchone();
		if count[0] < 1:
			return Response(status=404)
		for row in dataList:
			print str(row)
			dateTime = datetime.datetime.utcfromtimestamp(float(row["time"]/1000))
			cur.execute("insert into test(MRID,MID,TESTVALUE,`DATE`) values(%s,%s,%s,%s)",[mrid,row["mid"],row["value"],dateTime])
			con.commit()
			res = cur.fetchone()
		res = {"status":"success","message":""}
		return jsonify(res)
	else :
		return Response(status=404)
	


@app.route('/update',methods=['GET', 'POST'])
def updateRecord():
	if request.method == 'POST':
		data = request.data
		dataDict = json.loads(data)
		dataList = dataDict["test"]
		mrid = dataDict["MRNo"]
		con = mysql.get_db()
		cur = con.cursor()
		cur.execute("select count(*) from patient where patient.MRID = %s",[mrid])
		count = cur.fetchone();
		if count[0] < 1:
			return Response(status=404)
		for row in dataList:
			print str(row)
			dateTime = datetime.datetime.utcfromtimestamp(float(row["time"]))
			print "dateTime:"+str(dateTime)
			cur.execute("update test set test.TESTVALUE = %s where test.MRID = %s and test.MID = %s and test.DATE = %s",[row["value"],mrid,row["mid"],dateTime])
			con.commit()
		res = {"status":"success","message":""}
		return jsonify(res)
	else :
		return Response(status=404)

@app.route('/addpatient',methods=['POST'])
def addPatient():
	if request.method == 'POST':
		data = request.data
		dataDict = json.loads(data)
		mrid = dataDict["MRNo"]
		name = dataDict["name"]
		owner = dataDict["owner"]
		con = mysql.get_db()
		cur = con.cursor()
		cur.execute("select count(*) from patient where patient.MRID = %s",[mrid])
		count = cur.fetchone();
		if count[0] >= 1:
			res = {"status":"error","message":"the patient already exists"}
			return jsonify(res)
		if mrid and name and owner:
			cur.execute("insert into `patient`(MRID,PNAME,WNAME)values(%s,%s,%s)",[mrid,name,owner])
			con.commit()
		res = {"status":"success","message":""}
		return jsonify(res)

def utc_to_local(utcTime):
	dateTime = utcTime.replace(tzinfo = pytz.utc).astimezone(GMT)
	return dateTime.strftime("%Y-%m-%d %H:%M:%S")

if __name__ == '__main__':
	app.run()
	# app.run()