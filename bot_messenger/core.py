import ampalibe
from ampalibe import Messenger
from ampalibe.messenger import Action

chat = Messenger()

# create a get started option to get permission of user.
# chat.get_started()

@ampalibe.command('/')
def main(sender_id, cmd, **ext):
    chat.send_action(sender_id, Action.mark_seen)
    chat.send_text(sender_id, "Hello, Ampalibe")