# Blogging app Backend System

#### This app shows how a modern blogging app should be designed and developed using MongoDB and ExpressJS with REST API.

#### This project has 3 entities, User, articles and comments.

#### User has articles and comments both and thus have developed a dependency along with it. So if user wished to delete the app, I soft delete the user from the database so that the comments and articles don't become zombie data.

#### Have used ES6 javascript while developing this system, and handled the api call concurrently. Yes, true! Application is designed in such a way that concurrency is maintained and have tried to reduce the overhead.

#### MongoDB helps to retreive the data of user and comments reliably. And thus had a gained good enough understanding about MongoDB while developing it.
