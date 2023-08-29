

# BOT9AI-Task1 🚀
### Objective

Develop a RESTful API using Express.js framework backed by SQLite and Sequelize ORM. The API will serve as the backend for a platform where users can create chatbots. These chatbots will have conversations with end users.



## Tech Stack 💻

**Server:** Express.js, Node.js

**Database:** SQLite

**ORM:** Sequelize



## Features ✨

* **🏛️ MVC Architecture for Organized Structure:**: Implemented the Model-View-Controller (MVC) pattern to enhance code organization and separation of concerns. This modular approach allows for better maintainability and scalability.
* **🔒 Secure Handling with Environment Variables:** Enhanced security and production readiness by utilizing environment variables to store sensitive information, such as database credentials, API keys, and JWT secret. Also implemented Password encyption for user while registering.
* **🔍 Smart Entity Manipulation Logic:** Incorporated practical and efficient logics while handling entities. For instance, during user registration, the system intelligently checks whether the user already exists in the database. If found, the user is seamlessly logged in with a JWT token. If not, a new user is registered and a JWT token is generated for authentication.
* **🚀 Well-Defined Response Codes and Messages:** Implemented clear and appropriate HTTP response codes and descriptive messages throughout the API. This ensures transparent communication between the API and clients, facilitating effective error handling and understanding of the application's behavior.
* **🌐 API Endpoint Design and Pagination (Bonus):** Designed API endpoints following RESTful principles for structured interactions. Implemented pagination on endpoints that return lists of entities, enhancing performance and providing a more efficient user experience.
* **🛡️ JWT Authentication and Authorization (Bonus):** Incorporated JSON Web Tokens (JWT) for user authentication and authorization. This secure approach ensures that only authorized users can access protected routes and resources.


    
## API Reference
### Users
* #### Create User:
  Checks if user exits, if not then registers the user and send JWT Token, if exists, then logs in and send JWT Token.
```http
    POST http://localhost:5000/users
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | username|
| `email` | `string` | email of user|
| `password` | `string` | password of user|


* #### Get All User (protected route): 
  Fetches All Users and displays them in pagination format.
```http
  GET http://localhost:5000/users?page=1&limit=2
```
Send this as Query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `integer` | current page|
| `limit` | `integer` | limit of entries per page|

Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|

* #### Get User by Id (protected route): 
  Fetches a single User based on id
```http
  GET http://localhost:5000/users/:id
```

Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|

* #### Update User by Id (protected route): 
  Updates the details of user with particular Id.
```http
  PUT http://localhost:5000/users/:id
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `username` | `string` | Updated username|
| `email` | `string` | Updated email of user|
| `password` | `string` | Updated password of user|

Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|

* #### Delete User by Id (protected route): 
  Deletes the user with particular Id.
```http
  DELETE http://localhost:5000/users/:id
```
Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|

### Chatbot
* #### Create Chatbot (protected route):
  Checks if user exists for particular Id, if yes then, checks if chatbot with given name and userId exists, if not, then creates a new chatbot for the userId, else send appropriate response.
```http
    POST http://localhost:5000/users/:userId/chatbots
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Chatbot name|

Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|


* #### Get All Chatbots for userId (protected route): 
  Fetches All Chatbots for particular user and displays them in pagination format.
```http
    GET http://localhost:5000/users/:userId/chatbots?page=1&limit=2
```
Send this as Query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `integer` | current page|
| `limit` | `integer` | limit of entries per page|

Send this as Headers

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `authorization` | `string` | Bearer <space> <TOKEN>|

* #### Get Chatbot by chatbotId: 
  Fetches a single chatbot based on chatbotId
```http
  GET http://localhost:5000/chatbots/:chatbotId
```

* #### Update Chatbot by chatbotId: 
  Updates the details of chatbot with particular chatbotId.
```http
  PUT http://localhost:5000/chatbots/:chatbotId
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Updated name of Chatbot|
| `userId` | `string` | Updated userId of Chatbot|


* #### Delete Chatbot by chatbotId: 
  Deletes the chatbot with particular chatbotId.
```http
  DELETE http://localhost:5000/chatbots/:chatbotId
```
### Conversation
* #### Create Conversation:
  Checks if chatbot exists for particular chatbotId, if yes then, creates a new conversation for that chatbot, else send appropriate response.
```http
    POST http://localhost:5000/chatbots/:chatbotId/conversations
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `content` | `string` | Conversation Content|
| `endUserId` | `string` | id of EndUser|

* #### Get All conversations for chatbotId: 
  Fetches All conversations for particular chatbot and displays them in pagination format.
```http
    GET http://localhost:5000/chatbots/:chatbotId/conversations?page=1&limit=2
```
Send this as Query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `integer` | current page|
| `limit` | `integer` | limit of entries per page|

* #### Get Conversation by conversationId: 
  Fetches a single conversation based on conversationId
```http
  GET http://localhost:5000/conversations/:conversationId
```

* #### Update Conversation by conversationId: 
  Updates the details of conversation with particular conversationId.
```http
  PUT http://localhost:5000/conversations/:conversationId
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `content` | `string` | Updated Conversation Content|
| `chatbotId` | `string` | Updated id of Chatbot|
| `endUserId` | `string` | Updated id of EndUser|


* #### Delete Conversation by conversationId: 
  Deletes the conversation with particular conversationId.
```http
  DELETE http://localhost:5000/conversations/:conversationId
```

### EndUser
* #### Create EndUser:
  Checks if end-user with particular email exits, if not then registers a new end-user. If already exists, then send appropriate response.
```http
    POST http://localhost:5000/endusers
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | name of EndUser|
| `email` | `string` | email of EndUser|

* #### Get All EndUsers: 
  Fetches All EndUsers and displays them in pagination format.
```http
    GET http://localhost:5000/endusers?page=1&limit=2
```
Send this as Query

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `integer` | current page|
| `limit` | `integer` | limit of entries per page|

* #### Get EndUser by endUserId: 
  Fetches a single end-user based on endUserId
```http
  GET http://localhost:5000/endusers/:endUserId
```

* #### Update EndUser by endUserId: 
  Updates the details of end-user with particular endUserId.
```http
  PUT http://localhost:5000/endusers/:endUserId
```
Send this as Body 

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `name` | `string` | Updated name of endUser|
| `email` | `string` | Updated email of endUser|


* #### Delete EndUser by endUserId: 
  Deletes the end-user with particular endUserId.
```http
  DELETE http://localhost:5000/endusers/:endUserId
```
## Developed By

- Github: [@saksham9312](https://github.com/saksham9312)
- Mail: [saksham271.sg@gmail.com](mailto:saksham271.sg@gmail.com)
- Phone: +917982613501
