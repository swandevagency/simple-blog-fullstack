Sample Backend's blog for Node.js
This repository contains a sample backend code that demonstrates how to generate JWT and how user can login and register and see her/his profile and create simple blog.

Prerequisites
NodeJS version 14
MongoDB version 4

Set up and run
Clone the repository from GitHub.

$ git clone https://github.com/swandevagency/simple-blog-fullstack.git

Install dependencies

cd <project_name> //like: server

npm install

You should create .env file

In main root of project create .env  file and set below parameters:


Variable Name	                Description
PORT	              Port number that server is running on it.
URI	                Link of MongoDB database that here is "mongodb://localhost/<name of database>"
JWT_SECRET	        A token that contains user information and show user is authenticated and you should set complex string for it.
OTP_SECRET	        A token that has 2 minutes expires time that user must enter valid SMS verification code during login to get JWT token and you should set complex string for it.

Project Structure
The folder structure of this app is explained below:

Name	                        Description
controllers	            Controllers define functions to serve various express routes.
node_modules	          Contains all npm dependencies.
middleware	            Express middlewares which process the incoming requests before handling them down to the route and here contains JWT verification function.
models	                Models define schemas that will be used in storing and retrieving data from Application database.
routes	                Contain all express routes, separated by module/area of application.
package.json	          Contains npm dependencies as well as build scripts.
uploads	                Contains images of blogs that uploaded by users.
app.js	                Main file that contains server information and should not be deleted or route changes.

Build and run the project
nodemon

License
This library is released under ISC License.

Support
Our developer support team is here to help you.
You can find us on Slack with url: https://swan-agency.slack.com/archives/C025S62527N or send us email swan-agency.com.
