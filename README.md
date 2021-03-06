# Task Management (back-end)

This app is written in [Nodejs](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/) with the [Nestjs framework](https://nestjs.com/). I provided documentation for the APIs using [Swagger](https://swagger.io/).
The database is [MongoDB](https://www.mongodb.com/) which is created and run using [docker-compose](https://docs.docker.com/compose/).
For deployment I used [PM2](https://pm2.keymetrics.io/) which is a daemon process manager that will help you manage and keep your application online.

## How to run the application

* First clone the repository
* `cd communere-test/`
* Run `docker-compose up -d --build`

Now the application is up and running on port 80.

## API Documentation

Just Open the `/api` path (<http://localhost/api>) on your browser to see the swageer UI.

## Health Check

Just Open the `/health` (<http://localhost/health>) to see the app health results.
