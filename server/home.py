from flask import Flask, request
from flask import Response
from flaskext.mysql import MySQL
from flask import jsonify
from flask_cors import CORS, cross_origin
import json
import datetime

app = Flask(__name__)
mysql = MySQL()
CORS(app)
# MySQL configurations
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = ''
app.config['MYSQL_DATABASE_PORT'] = 3307
app.config['MYSQL_DATABASE_DB'] = 'COMS509_Project'
app.config['MYSQL_DATABASE_HOST'] = '127.0.0.1'

mysql.init_app(app)

@app.route('/')
def hello_world():
	return "server side"

@app.route('/login')
def longinValid():
	res = {"status":"success","message":"longin success"}
	return res

@app.route('/search', methods=['GET', 'POST'])
def searchData():
	if request.method == 'POST':
		data = request.data
		dataDict = json.loads(data)
		keyWord = "Ann"
		cur = mysql.connect().cursor()
		cur.execute("select patient.PNAME, patient.MRID from test, merit, patient where test.MRID = patient.MRID and test.MID = merit.MID and patient.`PNAME` like %s", [keyWord])
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

@app.route('/add',methods=['GET', 'POST','PUT'])
def addRecord():
	if request.method == 'PUT':
		mrid = '1'
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
			cur.execute("insert into test(MRID,MID,TESTVALUE,`DATE`) values(%s,%s,%s,%s)",[mrid,row["mid"],row["value"],row["time"]])
			con.commit()
			res = cur.fetchone()
		res = {"status":"success","message":""}
		return jsonify(res)
	else :
		return Response(status=404)
	


@app.route('/update',methods=['GET', 'POST'])
def updateRecord():
	if request.method == 'POST':
		mrid = '1'
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
			cur.execute("update test set test.TESTVALUE = %s where test.MRID = %s and test.MID = %s and test.DATE = %s",[row["value"],mrid,row["mid"],row["time"]])
			con.commit()
		res = {"status":"success","message":""}
		return jsonify(res)
	else :
		return Response(status=404)


if __name__ == '__main__':
	app.run(host='10.26.14.12')
	# app.run()