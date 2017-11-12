import os
from flask import Flask, request
from werkzeug.utils import secure_filename
import pymysql.cursors
from shutil import copyfile
import base64
from PIL import Image
from io import BytesIO
from math import sin, cos, sqrt, atan2, radians
import json

import MLmodule2


def distance_lat_lon(lat1, lon1, lat2, lon2):
    R = 6373.0

    lat1 = radians(lat1)
    lon1 = radians(lon1)
    lat2 = radians(lat2)
    lon2 = radians(lon2)

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat / 2) ** 2 + cos(lat1) * cos(lat2) * sin(dlon / 2) ** 2
    c = 2 * atan2(sqrt(a), sqrt(1 - a))

    return R * c

def loadFeed(id):
    sql2 = "SELECT * FROM uploads WHERE id>%s"
    cursor2 = connection.cursor()
    cursor2.execute(sql2, id)
    return cursor2


connection = pymysql.connect(host='localhost',
                             user='root',
                             password='',
                             db='crop_doctor',
                             charset='utf8mb4',
                             cursorclass=pymysql.cursors.DictCursor)


app = Flask(__name__)
UPLOAD_FOLDER = 'userUploads'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route('/', methods=['POST'])
def hello_world():
    if request.method == 'POST':
        data = request.get_json()
        if 'file' not in data:
            return 'No file uploaded'
        file = data['file']
        if file:
            filename = secure_filename('tempFile.png')
            im = Image.open(BytesIO(base64.b64decode(data['file'])))
            im.save(os.path.join(app.config['UPLOAD_FOLDER'], filename), 'JPEG')
            # Save data to db server
            with connection.cursor() as cursor:
                # Create a new record
                lat = data['lat']
                lon = data['long']
                hash = data['hash']
                disease = MLmodule2.find_disease()

                print("Disease found: ", disease)

                sql = "INSERT INTO `uploads` (`latitude`, `longitude`, `time`, `disease`, `hash`) VALUES (%s, %s, now(), %s, %s)"
                cursor.execute(sql, (lat, lon, disease, hash))

            # connection is not autocommit by default. So you must commit to save
            # your changes.
            connection.commit()

            # load this number from db
            max_sr_num = cursor.lastrowid
            filename2 = secure_filename('file%d.png'%max_sr_num)
            copyfile(os.path.join(app.config['UPLOAD_FOLDER'], filename), os.path.join(app.config['UPLOAD_FOLDER'], filename2))
            print("disease:" + disease)
            return '{disease: ' + disease + '}'
        else:
            return 'Something wrong'


@app.route('/init', methods=['POST'])
def appInitialization():
    print("hi")
    if request.method == 'POST':
        data = request.get_json()
        lat = data['lat']
        lon = data['long']
        id = data['id']
        min_dist = data['min_dist']

        retList = []
        if id != -1:
            cursor2 = loadFeed(id)
            for i in cursor2:
                if distance_lat_lon(float(lat), float(lon), i['latitude'], i['longitude']) < min_dist:
                    print(i)
                    retList.append(i)
                    i['time'] = i['time'].strftime("%Y-%m-%d %H:%M:%S")

        print(json.dumps(retList))
        return json.dumps(retList)




if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)

