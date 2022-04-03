from flask import Flask, json, request, jsonify
from flask_pymongo import PyMongo, ObjectId
from flask_cors import CORS

app = Flask(__name__)
app.config['MONGO_URI']='mongodb://localhost/crudapp'
mongo = PyMongo(app)

CORS(app)

db = mongo.db.users
# @app.route("/")
# def index():
#     return '<h1>Hello World</h1'

@app.route('/users', methods=['POST'])
def createUser():
    id = db.insert({
        'name': request.json['name'],
        'email': request.json['email'],
        'contact': request.json['contact'],
        'address': request.json['address']
    })
    return jsonify({'id': str(ObjectId(id)), 'msg': "User Added Successfully"})

@app.route('/users', methods=['GET'])
def getUsers():
    users = []
    for doc in db.find():
        users.append({
            '_id': str(ObjectId(doc['_id'])),
            'name': doc['name'],
            'email': doc['email'],
            'contact': doc['contact'],
            'address': doc['address'],
        })
    return jsonify(users)


@app.route('/user/<id>', methods=['GET'])
def getUser(id):
    user = db.find_one({'_id': ObjectId(id)})
    return jsonify({
            '_id': str(ObjectId(user['_id'])),
            'name': user['name'],
            'email': user['email'],
            'contact': user['contact'],
            'address': user['address'],
    })

@app.route('/users/<id>', methods=['DELETE'])
def deleteUser(id):
    db.delete_one({'_id': ObjectId(id)})
    return jsonify({'msg': "User Deleted Successfully"})


@app.route('/users/<id>', methods=['PUT'])
def updateUser(id):
    db.update_one({'_id': ObjectId(id)}, {'$set': {
         'name': request.json['name'],
         'email': request.json['email'],
         'contact': request.json['contact'],
         'address': request.json['address']
    }})
    return jsonify({'msg': "User Update Successfully"})


if __name__ == '__main__':
    app.run(debug=True)