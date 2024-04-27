## **About The Project**

This is a simple Node.js-based Web API using the latest LTS version of Node.js and an in-memory database. 

## **APIs**

The API has two controllers, **TodoController** and **AuthController**.

**Todo Controller**

TodoController has **CRUD APIs** for managing todo items, including:
* */get/{id}*
    - Gets the todos of the logged in user.
* */getall*
    - Gets the todos of all users.
* */put/{id}*, 
    - Updates the corresponding todo keeping in mind the authorization level.
* */create/{id}*
    - Creates a todo of the logged in user.
* */delete/{id}*
    - Deletes the corresponding todo keeping in mind the authorization level.

Use the url: `http://localhost:3000/api/todos/{api}`.

TodoController is protected, and only authorized users with two different roles will have access to it. 

* **`User` role** users can only get the list of todo items, and other APIs returns a 401 unauthorized error.
* **`Admin` role** users can access all APIs, including viewing other user's todo items.

**Auth Controller**

AuthController has APIs related to registration and login, which are:
* */register*
    - Registers a new user
* */login*
    - Logs in an existing user

Use the url: `http://localhost:3000/auth/{api}`.


In AuthController, upon successful login, the response contains a **JWT token** that encodes the user's first name, last name, email, isActive, and roles.

### **Built With**
<hr>

#### **Node.js**
Node.js is a fast and efficient server-side JavaScript runtime environment that allows developers to build scalable and data-intensive real-time applications. Its event-driven, non-blocking I/O model makes it particularly well-suited for building web servers, APIs, microservices, and real-time applications. With a large and active community of developers and a rich ecosystem of libraries, frameworks, and tools, Node.js is a popular choice for building high-performance web applications that run across distributed devices. Its lightweight runtime and cross-platform compatibility make it easy to deploy and run applications on various platforms, and its module system allows for easy extension of its capabilities.

#### **NeDB**
NeDB is an open-source embedded database that allows developers to persist data locally in Node.js applications. It is a lightweight NoSQL database that is built on top of the JSON format, and supports basic CRUD operations, indexes, and aggregation. NeDB is designed to be easy to use and has a simple API that is similar to that of MongoDB. It can be used as an in-memory database or can be persisted to disk, making it a great choice for small-scale applications that do not require a full-fledged database. Its small footprint, ease of use, and compatibility with Node.js make NeDB a popular choice among developers.

#### **Postman**
Postman is a popular API development tool that allows developers to design, test, and document APIs. It provides a simple and intuitive interface for making HTTP requests and supports a wide range of protocols and formats, including REST, SOAP, and GraphQL. Postman enables developers to automate the testing and documentation process, making it easier to collaborate and share API designs with other team members. It also offers a range of features, including response validation, API monitoring, and team collaboration tools, that help streamline the API development process.
