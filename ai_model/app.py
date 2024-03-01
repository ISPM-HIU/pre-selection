from flask import Flask, render_template, jsonify, request
import processor
app = Flask(__name__)
app.config['SECRET_KEY'] = 'enter-a-very-secretive-key-3479373'

@app.route('/', methods=["GET", "POST"])
def index():
    return render_template('index.html', **locals())

@app.route('/chatbot', methods=["GET", "POST"])
def chatbotResponse():
    if request.method == 'POST':
        the_question = request.json
        print(the_question['question'])
        response = processor.chatbot_response(the_question['question'])
        return jsonify({"response": response })


@app.route('/load-to-model', methods=["POST"])
def createModel():
    if request.method == 'POST':
        new_data = request.json
        response = processor.createNewModel(new_data)
        print(response)
        return jsonify({"response": response })
    
if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8888', debug=True)