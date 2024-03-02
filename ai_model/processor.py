import nltk
from nltk.stem import WordNetLemmatizer
lemmatizer = WordNetLemmatizer()
import pickle
import numpy as np
from keras.models import load_model
model = load_model('chatbot_second_model')
import json
import random
intents = json.loads(open('job_intents.json', encoding='utf-8').read())
words = pickle.load(open('words.pkl','rb'))
classes = pickle.load(open('classes.pkl','rb'))
nltk.download('punkt')
nltk.download('wordnet')
from keras.models import Sequential
from keras.layers import Dense, Dropout
from keras.optimizers.legacy import SGD
job_intents_global = {
    "intents"
}
def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words# return bag of words array: 0 or 1 for each word in the bag that exists in the sentencedef bow(sentence, words, show_details=True):

# tokenize the pattern
def bow(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    # bag of words - matrix of N words, vocabulary matrix
    bag = [0]*len(words)
    for s in sentence_words:
        for i,w in enumerate(words):
            if w == s:
                # assign 1 if current word is in the vocabulary position
                bag[i] = 1
                if show_details:
                    print ("found in bag: %s" % w)
    return(np.array(bag))

def predict_class(sentence, model):
    # filter out predictions below a threshold
    p = bow(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i,r in enumerate(res) if r>ERROR_THRESHOLD]
    # sort by strength of probability
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def getResponse(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if(i['tag'] == tag):
            result = {
                "response": random.choice(i['responses']),
                "id": i['publicationId']
            }
            break
        else:
            result = "You must ask the right questions"
    return result

def chatbot_response(msg):
    ints = predict_class(msg, model)
    print(job_intents_global)
    res = getResponse(ints, job_intents_global)
    return res

def createNewModel(new_data):
    # Load JSON data from a file
    # Save the new data to a JSON file
    # with open('job_intents.json', 'w') as file:
    #     json.dump(new_data, file, indent=4)
    job_intents_global = new_data
    print(job_intents_global)
    words=[]
    classes = []
    documents = []
    ignore_words = ['?', '!', ',', '.']
    data_file = open('job_intents.json', encoding='utf-8').read()
    intents = job_intents_global # json.loads(data_file)

    for intent in intents['intents']:
        for pattern in intent['patterns']:
            word_list = nltk.word_tokenize(pattern)
            words.extend(word_list)
            documents.append((word_list, intent['tag'])) 
            if intent['tag'] not in classes:
                classes.append(intent['tag'])

    print("------------------------------------------")
    print(documents)

    words = [lemmatizer.lemmatize(w.lower()) for w in words if w not in ignore_words]

    words = sorted(list(set(words)))
    classes = sorted(list(set(classes)))

    print("------------------------------------------")
    print (len(documents), "documents")
    print("------------------------------------------")
    print (len(classes), "classes", classes)
    print("------------------------------------------")
    print (len(words), "unique lemmatized words", words)

    pickle.dump(words,open('words.pkl','wb'))
    pickle.dump(classes,open('classes.pkl','wb'))

    # initializing training data
    training = []
    output_empty = [0] * len(classes)
    for doc in documents:
        bag = []
        pattern_words = doc[0]
        pattern_words = [lemmatizer.lemmatize(word.lower()) for word in pattern_words]
        for w in words:
            bag.append(1) if w in pattern_words else bag.append(0)
                
        output_row = list(output_empty)
        output_row[classes.index(doc[1])] = 1
        training.append([bag, output_row])

    print("------------------------------------------")
    print("training: ", training)

    random.shuffle(training)
    training = np.array(training, dtype="object")

    # create train and test lists. X - patterns, Y - intents
    train_x = list(training[:,0])
    train_y = list(training[:,1])
    print("Training data created")

    # Create model - 3 layers. First layer 128 neurons, second layer 64 neurons and 3rd output layer contains number of neurons
    # equal to number of intents to predict output intent with softmax
    model = Sequential()
    model.add(Dense(128, input_shape=(len(train_x[0]),), activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(64, activation='relu'))
    model.add(Dropout(0.5))
    model.add(Dense(len(train_y[0]), activation='softmax'))
    print('mande')
    # Compile model. Stochastic gradient descent with Nesterov accelerated gradient gives good results for this model
    sgd = SGD(learning_rate=0.01, decay=1e-6, momentum=0.9, nesterov=True)
    print('mande2')
    model.compile(loss='categorical_crossentropy', optimizer=sgd, metrics=['accuracy'])
    print('mande3')
    #fitting and saving the model
    hist = model.fit(np.array(train_x), np.array(train_y), epochs=500, batch_size=5, verbose=1)
    print('mande4')
    # New
    model.save('chatbot_second_model', hist)
    print('mande5')
    # Legacy 
    # model.save('chatbot_model.h5', hist)
    print("------------------------------------------")
    print("🔥 Model created 🚀")
    return new_data