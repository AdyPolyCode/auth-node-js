# auth-node-js

### Table of Contents

1. [General-Information](#general-information)

2. [Features](#features)

3. [Technologies](#technologies)

4. [Documentation](#documentation)

5. [Setup](#setup)

### General-Information

Authentication based assignment project.
The purpose of this project was to get acquainted with authentication and learn how it works.
Also to learn about other technologies as RabbitMQ & PrismaORM.
API provides data manipulation only for users who are either signed in & has verified account or has
already created an account that is need to be logged in for access and modification.
This kind of authorization is enabled with custom tokens which are generated for every single user.
API also provides verification for newly created accounts.
Crud operations on products can be made only by valid & authenticated users.
Database can store 2 types of users:
-BASIC: can only fetch resources from the database
-ADMIN: can do everything

### Features

-   RESTful API

-   CommonJS

-   Authentication system:

    -   Login

    -   Register

    -   Logout

    -   Account confirmation

-   Custom token based authentication

-   Password reset

-   Request body validation

-   Custom error responses

-   API documentation

### Technologies

1. Node

2. Express

3. Prisma ORM

4. RabbitMQ

## Documentation

-   external: https://app.swaggerhub.com/apis-docs/AdyPolyCode/auth-API/1.0.0

### Setup

Steps:

-   install dependencies

-   set up the environment file

    -   create .env

    -   add variables manually

-   run project in development mode

```shell

$ npm i

$ touch .env

$ npm run dev

```

### License

License can be accessed by clicking [here](https://github.com/AdyPolyCode/auth-node-js/blob/main/LICENSE) or in the repository directly.
