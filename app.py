from flask import Flask, jsonify, request
from main import read_questions
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


data_list = read_questions()


@app.get("/")
def oli():
    return jsonify({"oli" : "fsadf"})


@app.route('/trivia/questions', methods=['GET'])
def get_questions():
    return jsonify(data_list)


@app.route('/trivia/question', methods=['GET'])
def get_question():
    id_question = request.json['id_question']
    for x in data_list:
        if str(x['ID']) == str("'"+id_question+"'"):
            return jsonify(x)
    return jsonify({'error': 'question not found'})


@app.route('/register', methods=['POST'])
def register_user():
    username = request.json['username']
    password = request.json['password']

    formatted_user_data = f"{username}*{password}*"

    with open('db/users.txt', 'a') as file:
        file.write(formatted_user_data + '\n')

    return jsonify({"message": "user registered"})


@app.route('/login', methods=['POST'])
def login():
    username_ = request.json['username']
    password_ = request.json['password']

    with open('db/users.txt', 'r') as user_file:
        user_data = user_file.read()

    user_parts = user_data.split('*')

    user_list = []

    for i in range(0, len(user_parts), 3):
        if i + 2 < len(user_parts):
            username = user_parts[i].strip()
            password = user_parts[i + 1].strip()
            name = user_parts[i + 2].strip()

            user_dict = {
                'username': username,
                'password': password,
                'name': name
            }

            user_list.append(user_dict)

    for x in user_list:
        if x['username'] == username_:
            if x['password'] == password_:
                return jsonify({'message': 'user found'})
            else:
                return jsonify({'message': 'incorrect password'})

    return jsonify({'message': 'user not found'})


if __name__ == '__main__':
    app.run(host="localhost", port=5000, debug=True)
