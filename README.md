# NOTES

### What is this project? 👀

A backend service that implements a predefined API spec.
The API defines a set of operations for creating and reading account transactions.  
Backend specs are given by the [API SPEC](cypress/integration/backend.spec.js) (TDD)

### Usage

After installing the dependencies the following NPM scripts become available:

- `start`: starts the application in development mode on [http://localhost:5000](http://localhost:5000) (and builds the projects as well)
- `build`: builds the project
- `test`: Run the cypress [Test](cypress/integration/backend.spec.js) 


### Technologies

* NETCore 3.1,
* EntityFrameworkCore
* SQLite

### Patterns

* I tried to implement a thin Controller approach. 
* I created Services for implementing the business logic (I could also apply a Repository pattern)
* Use of Dependency Injection (IoC)
* Creation of ErrorController to handle Exceptions (for future use)