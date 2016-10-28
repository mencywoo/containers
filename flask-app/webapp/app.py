import os
from flask import Flask, request
from flaskext.mysql import MySQL
app = Flask(__name__)

mysql = MySQL()
app = Flask(__name__)
app.config.from_envvar('CONFIG')
mysql.init_app(app)

@app.route("/")
def hello():
    return "Welcome to Python Flask App!"

@app.route("/pets")
def Authenticate():
    owner = request.args.get('Owner')
    cursor = mysql.connect().cursor()
    cursor.execute("SELECT name, species from pet where owner='" + owner + "'")
    data = cursor.fetchall()
    if str(data) == '()':
        return "No pets for " + owner
    else:
        print "data", str(data)
#    else:
        a=""
        for row in data:
            a = a+", "+ str(row[0]) + "(" + str(row[1]) +  ")"
        return a[1:]

if __name__ == "__main__":
#    app.run()
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port)
