# Simple TODO app

In this project I implemented the backend of an TODO app, it is consisted of two microservices:

- todos - a service which enables CRUD operation for a task.
- notifications - a service which enables the logic to send notification for the user.
  Both services run on seperate ports under the same app, and are connected to one DB which is divided into documents.

## Tech stack:

- NodeJS - express
- mongoDB -mongoose
- mongoDB - atlas

## How to run:

1. Download the project form gitHub
2. Extract the folder into the desired location
3. Install the dependencies by running > npm i
4. From the main folder type in the terminal:
   1. > npm run start:notification to run the notification service
   2. > npm run start:todos to run the todos service
   3.   ** The DB is always running thanks to mongoDB Atlas **
5. Start testing with PostMan

## Considerations:

During the task I made some considerations in order to answer the requirements of the task:

- SendNotification() has already been implemented
- In order to support the SendNotification() function I created a route which filters out the upcoming tasks to complete
- Created one models folder for both of the microservices in order to access all model from whereever needed
- There was no actual need to generate a connection between the microservice besides the DB

## Points to improve

- In order to scale may consider using kafka
- Dockerize the services and run them on different containers
- Add user authenticattion
