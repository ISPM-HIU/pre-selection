import ampalibe
from ampalibe import Messenger
from ampalibe.messenger import Action
import requests
import json 

chat = Messenger()

# defining the api-endpoint 
API_ENDPOINT = "http://localhost:9090/api/publications/get-bot-response"

# create a get started option to get permission of user.
# chat.get_started()

@ampalibe.command('/')
def main(sender_id, cmd, **ext):
    chat.send_action(sender_id, Action.mark_seen)

    data = {'question': cmd.lower()}
     # sending post request and saving response as response object
    res = requests.post(url = API_ENDPOINT, data = data)
    if res.status_code == 200:
        res_from_web = res.json()
        print('res_from_web', res_from_web)
        chat.send_text(sender_id, res_from_web["response"]+", Voici le lien pour acheter: http://localhost:3000/post/"+ str(res_from_web["id"]))
    else:
        print("Request failed")
        chat.send_text(sender_id, "Veuillez poser une autre question s'il vous plaît.")
