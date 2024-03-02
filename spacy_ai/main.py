import cmd
import json
import requests 
import spacy
import fr_core_news_md
nlp = fr_core_news_md.load()
from flask import Flask, jsonify, request
app = Flask(__name__)
app.config['SECRET_KEY'] = 'enter-a-very-secretive-key-3479373'

# defining the api-endpoint 
API_ENDPOINT = "http://localhost:9090/api/publications/generate/bot/response"

def find_response(id, max_lemm, responses): 
    for response in responses:
        if(response['id'] == id):
            valid = {"response":response["response"], "lem_valid":max_lemm}
            return valid
            
def find_max_lemm_number(all_data, responses):
    print("----------4---------")
    max_id = all_data[0]["id"]
    max_lemm = all_data[0]["lemm_number"]
    selected = all_data[0]
    for data in all_data:
        if(data["lemm_number"] > max_lemm):
            max_id = data["id"]
            max_lemm = data["lemm_number"]
            selected = data

    return selected

@app.route('/chatbot', methods=["POST"])
def chatbotResponse():
    if request.method == 'POST':
        responses = request.json["model"]
        question = request.json["question"]
        print(question)
        print("----------1---------")
        # print(responses)

        new_data = []
        for index, response in enumerate(responses):
            new_intents = []
            for intent in response["intents"]:
                lems = nlp(intent.lower())
                new_intents.append(lems)

            new_data.append({
                "id": response["id"],
                "response": response["response"],
                "intents": new_intents
            })
        responses = new_data
        print("----------2---------")

        print(new_data)

        ignore_letters = ['!', '?', ',', '.','#','*']
        words = question.lower().split(" ")
        expected_responses = []
        for response in responses:
            input_true_lemm = 0
            for word in words:
                lems = nlp(word)
                for lems in response["intents"]:
                    print("lems")
                    print(lems)
                    print("response intents")
                    print(response["intents"])
                    input_true_lemm += 1
                print("boucle 2")
                
            if(input_true_lemm >= 2):
                expected_responses.append({
                    "id":response["id"], 
                    "lemm_number":input_true_lemm,
                    "response":response["response"],
                })
            
        print("----------3---------")
        print(expected_responses)
        
        if(len(expected_responses) != 0):
            # print(expected_responses)
            res_from_db = find_max_lemm_number(expected_responses, responses)
            print("Step 6")
            print(res_from_db)
            return app.json.response(res_from_db)
        else: 
            return app.json.response('Je n\'arrive pas à répondre à cette question. Veuillez me demander une autre s\'il vous plait')

if __name__ == '__main__':
    app.run(host='0.0.0.0', port='8888', debug=True)