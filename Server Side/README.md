# Project Management System
  Minimal Project Management System capable of managing projects with hierarchy of different users with different permission and roles i.e Admin, Project Manager, 
  Team Leader and Engineer. There can be Multiple Projects with multiple tasks assigned to a engineer or team lead to be finished in certain deadline. CRUD functionalities
  of different resources is dependent on the user role.

## Prerequisites
  Following are the prerequisites to setup and jump in right away into this project! 

- [Node.js](https://yarnpkg.com/en/docs/install)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)
- [PostgreSQL](https://www.postgresql.org/download/) 

## File structure

```
src/
├── controllers/  => API Route Controllers
├── middlewares/  => Request Handlers before it reaches controller (authentication, authorization, validations)
├── migrations/   => Migration file to update/rollback the database changes
├── models/       => Database access model based on tables
├── routes/       => Routing files for different endpoints
├── seeds/        => Adds test data for tables
├── services/     => Handles model for controllers

```
## Setup

Clone the repository, go to server side folder remove the remote branch, install the dependencies and get started right away.

    $ git clone git@github.com:Prajwalrajbasnet/Project-Management-System.git <application-name>
    $ cd Server\ Side
    $ rm -rf .git
    $ npm install

Make a copy of `.env.example` as `.env` and update your application server and port, database credentials and secret key for token generation (this can be whatever string you want).

    $ cp .env.example .env

Adjust the information in .env file and then migrate the database(start the database server if you haven't) after that seed the test data
    
    $ npm run migrate
    $ npm run seed

#### Finally, start the application.

    $ npm start
 
Now the application is live on http://localhost: (port number in env) you can use postman/insomnia to test the api or setup client side too to use the full app

## Authentication Endpoints 

Endpoints for user login which don't need authentication header

* Login : `POST /api/auth/login/`

## Endpoints that require Authentication and Authorization

Closed endpoints require a valid Token to be included in the header of the
request. A Token can be acquired from the Login view above. (Note that all the requests are not available for all types of users)

* Get all users a user: `GET /api/users`
* Create a user: `POST /api/users`
* Read update delete user: `GET PUT DELETE /api/users/id/:id`
* Update Password of user: `PUT /api/users/id/:id/credential`
* Get all projects: `GET /api/projects`
* Read update delete specific project: `GET PUT DELETE /api/projects/:id`
* Get & add user to a project: `GET POST /api/projects/:id/users`
* Get all tasks of a project: `GET /api/tasks?project=:projectId`
* Read update delete specific task: `GET PUT DELETE /api/tasks/:id`
* Get all user assigned to task and change/assign one : `GET PUT /api/tasks/:id/assign`
* Get all user tagged users to a task and add one : `GET POST /api/tasks/:id/assign`
* Get all comments of a task: `GET /api/comments?task=:taskId`
* Read update delete comment: `GET PUT DELETE /api/comments/:id`

# ALL ENDPOINTS
- /api/auth
- /api/users
- /api/users/register
- /api/users/id/:id
- /api/users/id/:id/credential
- /api/projects
- /api/projects/:id
- /api/projects/:id/users
- /api/tasks/
- /api/tasks/id
- /api/tasks/:id/assign
- /api/tasks/:id/tags
- /api/comments
- /api/comments/:id
