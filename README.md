# Final-Project-Back-end---Dev-Init
## Setup
  ```sh
  npm init -y
  npm install express mongoose bcryptjs jsonwebtoken dotenv body-parser
  ```
* .env
```sh
PORT=3000
DB_CONNECTION=<your connection string>
SECRET_KEY=mysecretkey
```
  
## API
### User 
  
`POST {{localhost}}/users/register`
* body
  ```sh
  {
    "username": "testuser1",
    "password": "passwo1234",
    "email": "test1@gmail.com"
  }
  ```

`POST {{localhost}}/users/login`
* body
  ```sh
  {
      "username": "testuser1",
      "password": "passwo1234"
  }
  ```
### *** Headers ***
  ```sh
  Authorization: Bearer <your_jwt_token>
  ```
Authorization: Bearer <your_jwt_token>
### Logs

`GET {{localhost}}/logs/`

`GET {{localhost}}/logs/1`

`POST {{localhost}}/logs/`
* body
  ```sh
  {
      "content": "This is a test log2.",
      "date": "2024-06-08"
  }
  ```

`PUT {{localhost}}/logs/2`
* body
  ```sh
  {
      "content": "This is a test log entry(updated).",
      "date": "2024-06-08"
  }
  ```

`DELETE {{localhost}}/logs/1`

### Todos

`GET {{localhost}}/todos/`

`GET {{localhost}}/todos/1`

`POST {{localhost}}/todos/`
* body
  ```sh
  {
      "title": "This is a test todo entry user2.",
      "description": "423423sdfg4",
      "due_date": "2024-06-08",
      "priority": 1
  }
  ```

`PUT {{localhost}}/todos/2`
* body
  ```sh
  {
      "title": "This is a test todo entry (updated).",
      "description": "4234234",
      "due_date": "2024-06-08",
      "priority": 2,
      "completed": true
  }
  ```

`DELETE {{localhost}}/todos/1`

### Events

`GET {{localhost}}/events/`

`GET {{localhost}}/events/1`

`POST {{localhost}}/events/`
* body
  ```sh
  {
      "title": "This is a test event entry.",
      "description": "4234sdfgsdfg234",
      "start_date": "2024-06-08",
      "end_date": "2024-07-08"
  }
  ```

`PUT {{localhost}}/events/2`
* body
  ```sh
  {
      "title": "This is a test event entry (updated).",
      "description": "4234sdfgsdfg234",
      "start_date": "2024-06-08",
      "end_date": "2024-07-12"
  }
  ```

`DELETE {{localhost}}/events/1`
