# TO DO (back-end)

This app is written in Nodejs, TypeScript with the Nestjs framework. I provided documentation for the APIs using [Swagger](https://swagger.io/).
The database is [MongoDB](https://www.mongodb.com/) which is created and run using [docker-compose](https://docs.docker.com/compose/).
For deployment I used [PM2](https://pm2.keymetrics.io/) which is a daemon process manager that will help you manage and keep your application online.

## How to run the application

* First clone the repository
* Run `docker-compose up -d --build`

Now the application is up and running running on the port 80.

## API Documentation

Just Open the `/api` path (http://localhost/api) on your browser to see the swageer UI.
