# Dev tools templates

## Installation

### Run the server without Docker
- Required Dependences: Node JS, Xampp
- Create a Database in phpMyAdmin, ex: hiu_db
- Go to server directories and run the command: ``npm install``
- Change the .env credentials like : 
```
    DATABASE_URL="mysql://USER:PASSWORD@HOST:PORT/DATABASE
```
example
```
    DATABASE_URL="mysql://root:123456@localhost:3306/hiu_db"
```
- Go to server directories and run the command:
```
    npm run migrate
    npm run generate
```
- To run the server : `` npm run dev ``, check if it work at: ``http://localhost:9001/``

### Run the server with Docker
- Run ``Docker compose up -d``
- Change the .env credentials like : 
```
    DATABASE_URL="mysql://root:root@172.25.0.2:3306/hiu_db"
```
- Run server `` npm run dev ``

### Run the client web
- Go to client/web directories and run:  
```
    npm i
    npm start
```

## Test the backend
- Run postman
- Create a new user:
```
    method: POST
    endpoints: http://localhost:9001/api/users
    body data or raw: {
        "name": "John",
        "last_name": "Doe", 
        "email": "john@gmail.com", 
        "password": "12345678"
    }
```
-   Get all user:
```
    method: GET
    endpoints: http://localhost:9001/api/users
```
- Get one user: 
```
    method: GET
    endpoints: http://localhost:9001/api/users/{id}
```
- Login: 
```
    method: POST
    endpoints: http://localhost:9001/api/users/login
    body data or raw: {
        "email": "john@gmail.com", 
        "password": "12345678"
    }
```
- Update: 
```
    method: PUT
    endpoints: http://localhost:9001/api/users/login
    body data or raw: {
        "id": user_id,
        "name": "", 
        "last_name": "", 
        "email": ""
    }
```
- Delete: 
```
    method: DELETE
    endpoints: http://localhost:9001/api/users/{id}
```

- Run ngrok for mobile: 
```
    ngrok http --domain=intent-wallaby-poorly.ngrok-free.app 9001
```

## Spacy 
- Install spacy_ai: 
```
    pip install spacy
    python -m spacy download en_core_web_sm
```